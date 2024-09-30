import { useContext } from "react";
import { CacheStoreContext } from "./CacheStoreConstants";
import { CacheKeys, DefaultValueString, Cache } from "./CacheStoreTypes";

export const useCacheStore = () => useContext(CacheStoreContext);
export const useCacheItem = <TKey extends CacheKeys>(
  key: TKey, 
  defaultValue: DefaultValueString = '{}'
) => useCacheStore().get(key, defaultValue);
export const useCacheItemMapped = <TKey extends CacheKeys, TResult>(
  key: TKey,
  map: (item: Cache[TKey]) => TResult,
  defaultValue: DefaultValueString = '{}'
) => {
  const item = useCacheItem(key, defaultValue);
  return map(item);
}