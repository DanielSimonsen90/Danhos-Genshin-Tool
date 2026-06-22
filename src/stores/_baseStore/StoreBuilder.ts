import { useRef } from "react";
import { createStore, StoreApi } from "zustand/vanilla";
import { useStore as useZustandStore } from "zustand";
import { devtools, persist, createJSONStorage, type PersistStorage, type StorageValue } from "zustand/middleware";
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

type InternalPersistenceConfig<TState> = {
  key: string;
  stringify?: (state: TState) => string;
  parse?: (stored: string) => TState;
};

type BuilderConfig<TState extends object> = {
  initialState: TState;
  apiFactories: UntypedApiFactory[];
  persistConfig?: InternalPersistenceConfig<TState>;
  storeName?: string;
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

export type InferStoreSnapshot<TStore extends { getState: () => object; }> = ReturnType<TStore["getState"]>;
export type InferStoreType<TStore extends { getState: () => object; }> = (
  InferStoreSnapshot<TStore>
  & Omit<TStore, "getState" | "setState" | "subscribe" | "useStore">
);

export default class StoreBuilder<
  TAccumState extends object = object,
  TAccumApi extends object = object
> {
  private readonly config: BuilderConfig<TAccumState>;
  private built = false;
  private builtStore?: Store<TAccumState, TAccumApi>;

  constructor(initialState?: TAccumState, config?: BuilderConfig<TAccumState>) {
    this.config = config ?? {
      initialState: (initialState ?? {}) as TAccumState,
      apiFactories: [],
      persistConfig: undefined,
      storeName: undefined,
    };
  }

  /**
   * Set the store name for DevTools
   */
  public setStoreName(name: string): StoreBuilder<TAccumState, TAccumApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    const nextConfig: BuilderConfig<TAccumState> = {
      ...this.config,
      storeName: name,
    };

    return this.createBuilder<TAccumState, TAccumApi>(nextConfig);
  }

  private createBuilder<TNextState extends object, TNextApi extends object>(
    nextConfig: BuilderConfig<TNextState>
  ): StoreBuilder<TNextState, TNextApi> {
    return new StoreBuilder<TNextState, TNextApi>(undefined, nextConfig);
  }

  // #region Builder API (Configuration Phase)

  public addState<TState extends object>(
    state: TState
  ): StoreBuilder<TAccumState & TState, TAccumApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    const nextConfig: BuilderConfig<TAccumState & TState> = {
      initialState: { ...this.config.initialState, ...state },
      apiFactories: this.config.apiFactories,
      persistConfig: this.config.persistConfig as InternalPersistenceConfig<TAccumState & TState> | undefined,
      storeName: this.config.storeName,
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

    const nextConfig: BuilderConfig<TAccumState> = {
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

    let persistConfig = this.config.persistConfig as InternalPersistenceConfig<TAccumState & TSliceState> | undefined;
    if (sliceConfig.persistConfig) {
      const slicePersist = sliceConfig.persistConfig as unknown as InternalPersistenceConfig<TAccumState & TSliceState>;
      if (persistConfig) {
        persistConfig = {
          key: persistConfig.key || slicePersist.key,
          stringify: persistConfig.stringify || slicePersist.stringify,
          parse: persistConfig.parse || slicePersist.parse,
        };
      } else {
        persistConfig = slicePersist;
      }
    }

    const nextConfig: BuilderConfig<TAccumState & TSliceState> = {
      initialState: { ...this.config.initialState, ...sliceConfig.initialState },
      apiFactories: [...this.config.apiFactories, ...sliceConfig.apiFactories],
      persistConfig,
      storeName: this.config.storeName || sliceConfig.storeName, // Preserve store name
    };

    return this.createBuilder<TAccumState & TSliceState, TAccumApi & TSliceApi>(nextConfig);
  }

  public addPersistence(config: PersistenceConfig<TAccumState>): StoreBuilder<TAccumState, TAccumApi> {
    if (this.built) throw new Error("Cannot modify builder after buildStore() is called");

    const nextConfig: BuilderConfig<TAccumState> = {
      ...this.config,
      persistConfig: { ...this.config.persistConfig, ...config } as InternalPersistenceConfig<TAccumState>,
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

    // Initialize state from config
    const initialState = { ...this.config.initialState } as TAccumState;

    // Create Zustand vanilla store with middleware (only manages state, not API)
    const storeName = this.config.storeName || 'UnnamedStore';
    let vanillaStore: StoreApi<TAccumState>;

    // Build middleware stack based on configuration
    const isDev = process.env.NODE_ENV === 'development';
    const hasPersist = !!this.config.persistConfig;

    if (hasPersist && isDev) {
      // Both persist and devtools
      const { key, stringify, parse } = this.config.persistConfig!;
      vanillaStore = createStore<TAccumState>()(
        persist(
          devtools(
            () => initialState,
            {
              name: storeName,
              enabled: true,
              anonymousActionType: 'action',
              trace: false,
              traceLimit: 25,
            }
          ),
          {
            name: key,
            storage: this.buildStorage<TAccumState>(stringify, parse),
          }
        )
      );
    } else if (hasPersist) {
      // Only persist (production)
      const { key, stringify, parse } = this.config.persistConfig!;
      vanillaStore = createStore<TAccumState>()(
        persist(
          () => initialState,
          {
            name: key,
            storage: this.buildStorage<TAccumState>(stringify, parse),
          }
        )
      );
    } else if (isDev) {
      // Only devtools (development, no persist)
      vanillaStore = createStore<TAccumState>()(
        devtools(
          () => initialState,
          {
            name: storeName,
            enabled: true,
            anonymousActionType: 'action',
            trace: false,
            traceLimit: 25,
          }
        )
      );
    } else {
      // No middleware (production, no persist)
      vanillaStore = createStore<TAccumState>()(
        () => initialState
      );
    }

    // Build the API separately (not part of Zustand state)
    const api = this.buildApi(vanillaStore);

    // Create wrapper functions for Builder API compatibility
    const getState = () => vanillaStore.getState();

    const setState = (partial: Functionable<Partial<TAccumState>, [current: TAccumState]>) => {
      const currentState = getState();
      const update = typeof partial === "function"
        ? (partial as (current: TAccumState) => Partial<TAccumState>)(currentState)
        : partial;

      vanillaStore.setState(update as any);
    };

    const subscribe = (subscriber: Subscriber) => {
      return vanillaStore.subscribe(subscriber);
    };

    // Shallow equality helper
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

    // Create useStore hook with selector support
    // Cache the full store snapshot to avoid creating new objects on every render
    let cachedFullStore: { snapshot: TAccumState & TAccumApi; state: TAccumState; } | null = null;

    function useStore(): TAccumState & TAccumApi;
    function useStore<TSelected>(selector: (store: TAccumState & TAccumApi) => TSelected): TSelected;
    function useStore<TSelected>(selector?: (store: TAccumState & TAccumApi) => TSelected): TSelected | (TAccumState & TAccumApi) {
      // Use Zustand's useStore with selector and shallow equality
      const cachedSelectorResult = useRef<{ value: TSelected; state: TAccumState; } | null>(null);

      if (selector) return useZustandStore(vanillaStore, (state) => {
        // Check if we can use cached result
        if (cachedSelectorResult.current && cachedSelectorResult.current.state === state) {
          return cachedSelectorResult.current.value;
        }

        // Combine state with API for selector
        const stateWithApi = { ...state, ...api } as TAccumState & TAccumApi;

        // Compute new value
        const value = selector(stateWithApi);

        // Check shallow equality with previous value
        if (cachedSelectorResult.current && shallowEqual(cachedSelectorResult.current.value, value)) {
          return cachedSelectorResult.current.value;
        }

        // Cache and return new value
        cachedSelectorResult.current = { value, state };
        return value;
      });

      // No selector - return full store (state + API)
      // Cache to avoid creating new objects on every render
      return useZustandStore(vanillaStore, (state) => {
        // Return cached snapshot if state hasn't changed
        if (cachedFullStore && cachedFullStore.state === state) {
          return cachedFullStore.snapshot;
        }

        // Create new snapshot
        const snapshot = { ...state, ...api } as TAccumState & TAccumApi;
        cachedFullStore = { snapshot, state };
        return snapshot;
      });
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

  private buildStorage<TState extends object>(
    stringify?: (state: TState) => string,
    parse?: (raw: string) => TState,
  ): PersistStorage<TState> {
    if (!stringify && !parse) return createJSONStorage(() => localStorage) as PersistStorage<TState>;
    return {
      getItem: (name: string): StorageValue<TState> | null => {
        try {
          const raw = localStorage.getItem(name);
          if (raw === null) return null;
          if (parse) return { state: parse(raw), version: 0 };
          return JSON.parse(raw) as StorageValue<TState>;
        } catch {
          return null;
        }
      },
      setItem: (name: string, value: StorageValue<TState>): void => {
        localStorage.setItem(name, stringify ? stringify(value.state) : JSON.stringify(value));
      },
      removeItem: (name: string): void => localStorage.removeItem(name),
    };
  }

  /**
   * Build the API methods separately from the Zustand state
   */
  private buildApi(vanillaStore: StoreApi<TAccumState>): TAccumApi {
    const api = {} as TAccumApi;

    // Create setState wrapper
    const setState = (partial: Functionable<Partial<TAccumState>, [current: TAccumState]>) => {
      if (typeof partial === "function") {
        vanillaStore.setState((state) => partial(state) as any);
      } else {
        vanillaStore.setState(partial as any);
      }
    };

    // Create getState wrapper
    const getState = () => vanillaStore.getState();

    // Build API from factories
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

    return api;
  }

  // #endregion
}