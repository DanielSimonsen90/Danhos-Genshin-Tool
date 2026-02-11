import { Functionable } from "@/common/types";
import { useSyncExternalStore } from "react";

type Subscriber = () => void;

type PersistenceConfig<TState> = {
  key: string;
  toJSON(state: TState): string;
  version: number;
};

type Store<State, Api> = ReturnType<StoreBuilder<State, Api>['buildStore']>

export default class StoreBuilder<AccumState = {}, AccumApi = {}> {
  protected state: AccumState = {} as AccumState;
  protected api: AccumApi = {} as AccumApi;
  protected subscribers = new Set<Subscriber>();
  protected persist?: PersistenceConfig<any>;

  constructor(initialState?: AccumState) {
    this.state = initialState || ({} as AccumState);
  }

  // #region Lifecycle
  public setState(partial: Functionable<Partial<AccumState>>) {
    const update = typeof partial === "function"
      ? (partial as (state: AccumState) => Partial<AccumState>)(this.state)
      : partial;
    this.state = { ...this.state, ...update };
    this.subscribers.forEach(subscriber => subscriber());

    if (this.persist) {
      try {
        localStorage.setItem(this.persist.key, this.persist.toJSON(this.state));
      } catch { }
    }
  };

  public getState() {
    return this.state;
  }

  protected onInit() {
    if (this.persist) {
      try {
        const stored = localStorage.getItem(this.persist.key);
        if (stored) {
          const parsed = JSON.parse(stored);
          this.state = { ...this.state, ...parsed };
        }
      } catch { }
    }
  }
  // #endregion

  // #region Injection
  public subscribe(subscriber: Subscriber) {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  };

  public getSnapshot() {
    return { ...this.state, ...this.api };
  }

  public inject<OtherState, OtherApi>(
    injectedStore: Store<OtherState, OtherApi> | StoreBuilder<OtherState, OtherApi>,
    callback: (this: AccumState & AccumApi, injected: OtherState & OtherApi, self: AccumState & AccumApi) => void
  ) {
    const injectedSnapshot = "getStore" in injectedStore 
      ? injectedStore.getStore().getSnapshot() 
      : injectedStore.getSnapshot();

    injectedStore.subscribe(() => {
      callback.call(
        this.getSnapshot(), 
        injectedSnapshot,
        this.getSnapshot()
      );
    })
  }
  // #endregion

  // #region Builder API
  public addState<TState>(
    callback: (set: (partial: Functionable<Partial<AccumState & TState>>) => void) => TState
  ): StoreBuilder<AccumState & TState, AccumApi> {
    const newState = callback(this.setState.bind(this));
    this.state = { ...this.state, ...newState };
    return this as any;
  }

  public addApi<TApi>(
    callback: (
      get: () => AccumState, 
      set: (partial: Functionable<Partial<AccumState>>) => void
    ) => TApi
  ): StoreBuilder<AccumState, AccumApi & TApi> {
    const newApi = callback(
      this.getState.bind(this), 
      this.setState.bind(this)
    );
    this.api = { ...this.api, ...newApi };
    return this as any;
  }

  public addSlice<TSliceState, TSliceApi>(
    slice: StoreBuilder<TSliceState, TSliceApi>,
  ): StoreBuilder<AccumState & TSliceState, AccumApi & TSliceApi> {
    this.state = { ...this.state, ...slice.getState() };
    this.api = { ...this.api, ...slice };
    return this as StoreBuilder<AccumState & TSliceState, AccumApi & TSliceApi>;
  }

  public addPersistence(config: PersistenceConfig<AccumState>): this {
    this.persist = { ...this.persist, ...config };
    return this;
  }

  public addInjection<OtherState, OtherApi>(
    injectedStore: Store<OtherState, OtherApi> | StoreBuilder<OtherState, OtherApi>,
    callback: (this: AccumState & AccumApi, injected: OtherState & OtherApi, self: AccumState & AccumApi) => void
  ): this {
    this.inject(injectedStore, callback);
    return this;
  }

  public buildStore() {
    this.onInit();
    
    return {
      getState: this.getState.bind(this),
      setState: this.setState.bind(this),
      subscribe: this.subscribe.bind(this),
      useStore: () => useSyncExternalStore(this.subscribe, this.getSnapshot.bind(this)),
      getStore: () => this,
      ...this.api,
    };
  }
  // #endregion
}