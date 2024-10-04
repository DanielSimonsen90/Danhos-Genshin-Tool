import { useContext } from "react";
import { CacheStoreContext } from "./CacheStoreConstants";
import { CacheKeys, DefaultValueString, Cache } from "./CacheStoreTypes";
import { DebugLog } from "@/common/functions/dev";

const debugLog = DebugLog(DebugLog.DEBUGS.cacheStore);

export const useCacheStore = () => useContext(CacheStoreContext);
export const useCacheItem = <TKey extends CacheKeys>(
  key: TKey, 
  defaultValue: DefaultValueString = '{}'
) => {
  const result = useCacheStore().get(key, defaultValue);
  debugLog(`[useCacheItem](${key})`, result);
  return result;
}

export const useCacheItemMapped = <TKey extends CacheKeys, TResult>(
  key: TKey,
  map: (item: Cache[TKey]) => TResult,
  defaultValue: DefaultValueString = '{}'
) => {
  const item = useCacheItem(key, defaultValue);
  if (!item) return undefined;
  
  const mapped = map(item);
  debugLog(`[useCacheItemMapped](${key})`, mapped);
  return mapped;
}