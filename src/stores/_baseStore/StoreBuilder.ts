import { useSyncExternalStore } from "react";
import { Functionable } from "@/common/types";

type AnyApiFactory = (props: {
  get: () => unknown;
  set: (partial: unknown) => void;
  api: unknown;
  builder: unknown;
}) => unknown;
type AnyPersistenceConfig = PersistenceConfig<unknown>;

type Subscriber = () => void;

type PersistenceConfig<TState> = {
  key: string;
  stringify?: (state: TState) => string;
  parse?: (stored: string) => TState;
};

type ApiFactory<TState extends object, TApi, TCurrentApi extends object = object> = (props: {
  get: () => TState;
  set: (partial: Functionable<Partial<TState>, [current: TState]>) => void;
  api: TCurrentApi;
  builder: StoreBuilder<TState, TCurrentApi>;
}) => TApi;

type Store<TState extends object, TApi extends object> = {
  getState: () => TState;
  setState: (partial: Functionable<Partial<TState>, [current: TState]>) => void;
  subscribe: (subscriber: Subscriber) => () => void;
  useStore: {
    (): TState & TApi;
    <TSelected>(selector: (store: TState & TApi) => TSelected): TSelected;
  };
} & TApi;

export default class StoreBuilder<
  TAccumState extends object = object,
  TAccumApi extends object = object
> {
  private initialState = {} as TAccumState;
  private apiFactories: Array<AnyApiFactory> = [];
  private persistConfig?: AnyPersistenceConfig;
  private built = false;
  private builtStore?: Store<TAccumState, TAccumApi>;

  constructor(initialState?: TAccumState) {
    this.initialState = initialState ?? this.initialState;
  }

  // #region Builder API (Configuration Phase)

  public addState<TState>(
    state: TState
  ): StoreBuilder<TAccumState & TState, TAccumApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    this.initialState = { ...this.initialState, ...state };
    return this as unknown as StoreBuilder<TAccumState & TState, TAccumApi>;
  }

  public addApi<TApi>(
    factory: ApiFactory<TAccumState, TApi, TAccumApi>
  ): StoreBuilder<TAccumState, TAccumApi & TApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    this.apiFactories.push(factory as unknown as AnyApiFactory);
    return this as unknown as StoreBuilder<TAccumState, TAccumApi & TApi>;
  }

  public addSlice<TSliceState extends object, TSliceApi extends object>(
    slice: StoreBuilder<TSliceState, TSliceApi>,
  ): StoreBuilder<TAccumState & TSliceState, TAccumApi & TSliceApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    this.initialState = { ...this.initialState, ...slice.initialState };
    this.apiFactories.push(...slice.apiFactories);

    if (slice.persistConfig) {
      if (this.persistConfig) {
        this.persistConfig = {
          key: this.persistConfig.key || slice.persistConfig.key,
          stringify: this.persistConfig.stringify || slice.persistConfig.stringify,
          parse: this.persistConfig.parse || slice.persistConfig.parse,
        };
      } else {
        this.persistConfig = slice.persistConfig;
      }
    }

    return this as unknown as StoreBuilder<TAccumState & TSliceState, TAccumApi & TSliceApi>;
  }

  public addPersistence(config: PersistenceConfig<TAccumState>): this {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    this.persistConfig = { ...this.persistConfig, ...config } as AnyPersistenceConfig;
    return this;
  }

  // #endregion

  // #region Build Phase (Execution)

  public buildStore(): Store<TAccumState, TAccumApi> {
    if (this.built) {
      if (!this.builtStore) {
        throw new Error("Store has already been built but no built store was cached");
      }

      return this.builtStore;
    }

    this.built = true;

    const subscribers = new Set<Subscriber>();
    let state = { ...this.initialState };
    let cachedSnapshot: TAccumState & TAccumApi;

    if (this.persistConfig) {
      const { key, parse = JSON.parse } = this.persistConfig;
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          state = parse(stored) as TAccumState;
        }
      } catch (error) {
        console.error("Failed to load persisted data:", error);
      }
    }

    const getState = () => state;

    let api = {} as TAccumApi;
    const setState = (partial: Functionable<Partial<TAccumState>, [current: TAccumState]>) => {
      const update = typeof partial === "function"
        ? (partial as (current: TAccumState) => Partial<TAccumState>)(state)
        : partial;

      state = { ...state, ...update };
      cachedSnapshot = { ...state, ...api };

      subscribers.forEach(subscriber => subscriber());

      if (this.persistConfig) {
        const { key, stringify = JSON.stringify } = this.persistConfig;
        try {
          localStorage.setItem(key, stringify(state));
        } catch (error) {
          console.error("Failed to persist data:", error);
        }
      }
    };

    const subscribe = (subscriber: Subscriber) => {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    };

    try {
      for (const factory of this.apiFactories) {
        const factoryResult = factory({
          get: getState,
          set: setState as unknown as (partial: unknown) => void,
          api,
          builder: this as unknown as StoreBuilder<TAccumState, TAccumApi>,
        });

        api = { ...api, ...(factoryResult as object) } as TAccumApi;
      }
    } catch (error) {
      console.error("Error building store API:", error);
      throw error;
    }

    cachedSnapshot = { ...state, ...api };
    const getSnapshot = () => cachedSnapshot;

    function useStore(): TAccumState & TAccumApi;
    function useStore<TSelected>(selector: (store: TAccumState & TAccumApi) => TSelected): TSelected;
    function useStore<TSelected>(selector?: (store: TAccumState & TAccumApi) => TSelected): TSelected | (TAccumState & TAccumApi) {
      const store = useSyncExternalStore(subscribe, getSnapshot);
      return selector ? selector(store) : store;
    }

    const builtStore = {
      getState,
      setState,
      subscribe,
      useStore,
      ...api,
    } as Store<TAccumState, TAccumApi>;

    this.builtStore = builtStore;
    return builtStore;
  }

  // #endregion
}