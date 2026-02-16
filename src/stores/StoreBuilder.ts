import { useSyncExternalStore } from "react";
import { Functionable } from "@/common/types";
import MemoizeService from "@/services/MemoizeService";

type Subscriber = () => void;

type PersistenceConfig<TState> = {
  key: string;
  stringify?: (state: TState) => string;
  parse?: (stored: string) => TState;
  version: number;
};

type Store<State, Api> = ReturnType<StoreBuilder<State, Api>['buildStore']>

export default class StoreBuilder<AccumState = {}, AccumApi = {}> {
  protected state: AccumState = {} as AccumState;
  protected api: AccumApi = {} as AccumApi;
  protected subscribers = new Set<Subscriber>();
  protected persist?: PersistenceConfig<any>;
  protected memoService = new MemoizeService();

  constructor(initialState?: AccumState) {
    this.state = initialState || ({} as AccumState);
  }

  // #region Lifecycle
  protected setState(partial: Functionable<Partial<AccumState>>) {
    const update = typeof partial === "function"
      ? (partial as (state: AccumState) => Partial<AccumState>)(this.state)
      : partial;
    this.state = { ...this.state, ...update };
    this.subscribers.forEach(subscriber => subscriber());

    if (this.persist) {
      const { key, stringify = JSON.stringify } = this.persist;

      try {
        localStorage.setItem(key, stringify(this.state));
      } catch { }
    }
  };

  protected getState() {
    return this.state;
  }

  protected onInit() {
    if (this.persist) {
      const { key, parse = JSON.parse } = this.persist;
      
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = parse(stored);
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
    return this.memoService.memoize(() => ({ ...this.state, ...this.api }), [this.state, this.api]);
  }

  protected inject<OtherState, OtherApi>(
    injectedStore: Store<OtherState, OtherApi> | StoreBuilder<OtherState, OtherApi>,
    callback: (this: AccumState & AccumApi, injected: OtherState & OtherApi, self: AccumState & AccumApi) => void
  ) {
    const injectedSnapshot = "getBuilder" in injectedStore 
      ? injectedStore.getBuilder().getSnapshot() 
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
    state: TState
  ): StoreBuilder<AccumState & TState, AccumApi> {
    this.state = { ...this.state, ...state };
    return this as any as StoreBuilder<AccumState & TState, AccumApi>;
  }

  public addApi<TApi>(
    callback: (
      props: {
        get: () => AccumState, 
        set: (partial: Functionable<Partial<AccumState>>) => void,
        api: AccumApi,
        builder: StoreBuilder<AccumState, AccumApi>
      }
    ) => TApi
  ): StoreBuilder<AccumState, AccumApi & TApi> {
    const newApi = callback({
      get: this.getState.bind(this), 
      set: this.setState.bind(this),
      api: this.api,
      builder: this,
    }
    );
    this.api = { ...this.api, ...newApi };
    return this as any as StoreBuilder<AccumState, AccumApi & TApi>
  }

  public addSlice<TSliceState, TSliceApi>(
    slice: StoreBuilder<TSliceState, TSliceApi>,
  ): StoreBuilder<AccumState & TSliceState, AccumApi & TSliceApi> {
    this.state = { ...this.state, ...slice.getState() };
    this.api = { ...this.api, ...slice };
    return this as any as StoreBuilder<AccumState & TSliceState, AccumApi & TSliceApi>;
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

  private useStore(): AccumState & AccumApi;
  private useStore<TSelected>(selector: (store: AccumState & AccumApi) => TSelected): TSelected;
  private useStore<TSelected>(selector?: (store: AccumState & AccumApi) => TSelected) {
    const store = useSyncExternalStore(
      this.subscribe.bind(this),
      this.getSnapshot.bind(this)
    );

    return (
      selector
        ? selector(store)
        : store
    );
  }

  public buildStore() {
    this.onInit();
    
    return {
      getState: this.getState.bind(this),
      setState: this.setState.bind(this),
      subscribe: this.subscribe.bind(this),
      useStore: this.useStore.bind(this),
      getBuilder: () => this,
      ...this.api,
    };
  }
  // #endregion
}