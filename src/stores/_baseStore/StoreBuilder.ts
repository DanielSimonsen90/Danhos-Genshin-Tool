import { useSyncExternalStore, useRef } from "react";
import { Functionable } from "@/common/types";

type Subscriber = () => void;

type PersistenceConfig<TState> = {
  key: string;
  stringify?: (state: TState) => string;
  parse?: (stored: string) => TState;
};

type BuilderFacade<TState extends object, TApi extends object> = {
  buildStore: () => Store<TState, TApi>;
};

type ApiFactory<TState extends object, TApi, TCurrentApi extends object = object> = (props: {
  get: () => TState;
  set: (partial: Functionable<Partial<TState>, [current: TState]>) => void;
  api: TCurrentApi;
  builder: BuilderFacade<TState, TCurrentApi>;
}) => TApi;

type UntypedApiFactory = (props: {
  get: () => object;
  set: (partial: Functionable<Partial<object>, [current: object]>) => void;
  api: object;
  builder: BuilderFacade<object, object>;
}) => object;

type InternalPersistenceConfig = {
  key: string;
  stringify?: (state: object) => string;
  parse?: (stored: string) => object;
};

type BuilderConfig = {
  initialState: object;
  apiFactories: UntypedApiFactory[];
  persistConfig?: InternalPersistenceConfig;
};

type Store<TState extends object, TApi extends object> = {
  getState: () => TState;
  setState: (partial: Functionable<Partial<TState>, [current: TState]>) => void;
  subscribe: (subscriber: Subscriber) => () => void;
  useStore: {
    (): TState & TApi;
    <TSelected>(selector: (store: TState & TApi) => TSelected): TSelected;
  };
  useStoreActions?: () => TApi;
} & TApi;

export type InferStoreSnapshot<TStore extends { getState: () => object }> = ReturnType<TStore["getState"]>;
export type InferStoreType<TStore extends { getState: () => object }> = (
  InferStoreSnapshot<TStore>
  & Omit<TStore, "getState" | "setState" | "subscribe" | "useStore">
);

export default class StoreBuilder<
  TAccumState extends object = object,
  TAccumApi extends object = object
> {
  private readonly config: BuilderConfig;
  private built = false;
  private builtStore?: Store<TAccumState, TAccumApi>;

  constructor(initialState?: TAccumState, config?: BuilderConfig) {
    this.config = config ?? {
      initialState: initialState ?? {},
      apiFactories: [],
      persistConfig: undefined,
    };
  }

  private createBuilder<TNextState extends object, TNextApi extends object>(
    nextConfig: BuilderConfig
  ): StoreBuilder<TNextState, TNextApi> {
    return new StoreBuilder<TNextState, TNextApi>(undefined, nextConfig);
  }

  // #region Builder API (Configuration Phase)

  public addState<TState extends object>(
    state: TState
  ): StoreBuilder<TAccumState & TState, TAccumApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    const nextConfig: BuilderConfig = {
      ...this.config,
      initialState: { ...this.config.initialState, ...state },
    };

    return this.createBuilder<TAccumState & TState, TAccumApi>(nextConfig);
  }

  public addApi<TApi extends object>(
    factory: ApiFactory<TAccumState, TApi, TAccumApi>
  ): StoreBuilder<TAccumState, TAccumApi & TApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    const wrappedFactory: UntypedApiFactory = (props) => {
      return factory({
        get: props.get as () => TAccumState,
        set: props.set as (partial: Functionable<Partial<TAccumState>, [current: TAccumState]>) => void,
        api: props.api as TAccumApi,
        builder: props.builder as BuilderFacade<TAccumState, TAccumApi>,
      }) as object;
    };

    const nextConfig: BuilderConfig = {
      ...this.config,
      apiFactories: [...this.config.apiFactories, wrappedFactory],
    };

    return this.createBuilder<TAccumState, TAccumApi & TApi>(nextConfig);
  }

  public addSlice<TSliceState extends object, TSliceApi extends object>(
    slice: StoreBuilder<TSliceState, TSliceApi>,
  ): StoreBuilder<TAccumState & TSliceState, TAccumApi & TSliceApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    const sliceConfig = slice.config;

    let persistConfig = this.config.persistConfig;
    if (sliceConfig.persistConfig) {
      if (persistConfig) {
        persistConfig = {
          key: persistConfig.key || sliceConfig.persistConfig.key,
          stringify: persistConfig.stringify || sliceConfig.persistConfig.stringify,
          parse: persistConfig.parse || sliceConfig.persistConfig.parse,
        };
      } else {
        persistConfig = sliceConfig.persistConfig;
      }
    }

    const nextConfig: BuilderConfig = {
      initialState: { ...this.config.initialState, ...sliceConfig.initialState },
      apiFactories: [...this.config.apiFactories, ...sliceConfig.apiFactories],
      persistConfig,
    };

    return this.createBuilder<TAccumState & TSliceState, TAccumApi & TSliceApi>(nextConfig);
  }

  public addPersistence(config: PersistenceConfig<TAccumState>): StoreBuilder<TAccumState, TAccumApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    const nextConfig: BuilderConfig = {
      ...this.config,
      persistConfig: { ...this.config.persistConfig, ...config } as InternalPersistenceConfig,
    };

    return this.createBuilder<TAccumState, TAccumApi>(nextConfig);
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
    let state = { ...this.config.initialState } as TAccumState;
    let cachedSnapshot: TAccumState & TAccumApi;

    if (this.config.persistConfig) {
      const { key, parse = JSON.parse } = this.config.persistConfig;
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = parse(stored) as unknown;
          if (parsed && typeof parsed === "object") {
            state = { ...state, ...(parsed as Partial<TAccumState>) };
          }
        }
      } catch (error) {
        console.error("Failed to load persisted data:", error);
      }
    }

    const getState = () => state;

    const api = {} as TAccumApi;
    const setState = (partial: Functionable<Partial<TAccumState>, [current: TAccumState]>) => {
      const update = typeof partial === "function"
        ? (partial as (current: TAccumState) => Partial<TAccumState>)(state)
        : partial;

      state = { ...state, ...update };
      cachedSnapshot = { ...state, ...api };

      subscribers.forEach(subscriber => subscriber());

      if (this.config.persistConfig) {
        const { key, stringify = JSON.stringify } = this.config.persistConfig;
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
      for (const factory of this.config.apiFactories) {
        const factoryResult = factory({
          get: getState as () => object,
          set: setState as (partial: Functionable<Partial<object>, [current: object]>) => void,
          api: api as object,
          builder: this as BuilderFacade<object, object>,
        });

        // Preserve getters when merging API
        Object.defineProperties(api, Object.getOwnPropertyDescriptors(factoryResult));
      }
    } catch (error) {
      console.error("Error building store API:", error);
      throw error;
    }

    cachedSnapshot = { ...state, ...api };

    function shallowEqual(objA: any, objB: any): boolean {
      if (Object.is(objA, objB)) return true;
      
      if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
      }
      
      const keysA = Object.keys(objA);
      const keysB = Object.keys(objB);
      
      if (keysA.length !== keysB.length) return false;
      
      for (let i = 0; i < keysA.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
          return false;
        }
      }
      
      return true;
    }

    function useStore(): TAccumState & TAccumApi;
    function useStore<TSelected>(selector: (store: TAccumState & TAccumApi) => TSelected): TSelected;
    function useStore<TSelected>(selector?: (store: TAccumState & TAccumApi) => TSelected): TSelected | (TAccumState & TAccumApi) {
      // Cache selector result to avoid creating new objects in getSnapshot
      const cachedSelectorResult = useRef<{ value: TSelected; snapshot: typeof cachedSnapshot } | null>(null);
      
      // Initialize cache if needed
      if (selector && (!cachedSelectorResult.current || cachedSelectorResult.current.snapshot !== cachedSnapshot)) {
        cachedSelectorResult.current = {
          value: selector(cachedSnapshot),
          snapshot: cachedSnapshot
        };
      }
      
      const store = useSyncExternalStore(
        (callback) => {
          if (selector) {
            // Selector-based subscription with shallow equality check
            let previousValue = cachedSelectorResult.current?.value ?? selector(cachedSnapshot);
            
            const wrappedCallback = () => {
              const nextValue = selector(cachedSnapshot);
              const areEqual = shallowEqual(previousValue, nextValue);
              
              if (!areEqual) {
                previousValue = nextValue;
                cachedSelectorResult.current = { value: nextValue, snapshot: cachedSnapshot };
                callback();
              }
            };
            
            return subscribe(wrappedCallback);
          }
          
          // Full store subscription (no selector)
          return subscribe(callback);
        },
        () => selector ? cachedSelectorResult.current!.value : cachedSnapshot
      );
      
      return store;
    }

    function useStoreActions(): TAccumApi {
      return api;
    }

    const builtStore = {
      getState,
      setState,
      subscribe,
      useStore,
      useStoreActions,
      ...api,
    } as Store<TAccumState, TAccumApi>;

    this.builtStore = builtStore;
    return builtStore;
  }

  // #endregion
}