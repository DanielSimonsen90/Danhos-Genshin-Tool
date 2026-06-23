import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { CacheState, CacheKeys } from "../CacheStoreTypes";

export default new StoreBuilder<CacheState>()
  .addApi(({ get, set }) => {
    function getItem<TKey extends CacheKeys>(key: TKey, defaultValue: any): CacheState[TKey] {
      return get()[key] ?? defaultValue;
    }

    function has<TKey extends CacheKeys>(key: TKey): boolean {
      const item = get()[key];
      return !!item && (typeof item !== 'object' || Object.keys(item).length > 0);
    }

    function getFromItem<TKey extends CacheKeys, TChildKey extends keyof CacheState[TKey]>(
      key: TKey,
      childKey: TChildKey,
      defaultValue: any
    ): CacheState[TKey][TChildKey] | undefined {
      return getItem(key, defaultValue)[childKey];
    }

    return {
      get: getItem,
      has,
      getFromItem,
    }
  })
