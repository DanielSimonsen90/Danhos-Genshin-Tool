import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Cache, CacheKeys, CacheStore, DefaultValueString } from "./CacheStoreTypes";
import { Dispatch, SetStateAction, useEffect } from "react";

export function useCacheFunctions(cache: Cache, setCache: Dispatch<SetStateAction<Cache>>) {
  useCacheSaveEffect(cache);

  return {
    has, findObject,
    set, get, getFromItem, update, delete: deleteItem, clear,
  } as const;

  function has<TKey extends CacheKeys>(key: TKey): boolean {
    return key in cache && cache[key] !== undefined;
  }
  function findObject<
    TKey extends CacheKeys, 
    TChildKey extends keyof Cache[TKey]
  >(
    key: TKey, 
    callback: (obj: Cache[TKey][TChildKey]) => boolean
  ): Cache[TKey][TChildKey] | undefined {
    const item = cache[key];
    if (typeof item !== 'object' && !Array.isArray(item)) return undefined;

    return Object.values(item).find(callback) as Cache[TKey][TChildKey];
  }
  function set<TKey extends CacheKeys>(key: TKey, value: Cache[TKey]): void {
    setCache(v => ({ ...v, [key]: value }));
  }
  function get<TKey extends CacheKeys>(key: TKey, defaultValue: DefaultValueString): Cache[TKey] | undefined {
    // if (!has(key)) setCache(v => ({ ...v, [key]: defaultValue }));
    return cache[key];
  }
  function getFromItem<
    TKey extends CacheKeys, 
    TChildKey extends keyof Cache[TKey]
  >(
    key: TKey, 
    childKey: TChildKey, 
    defaultValue: DefaultValueString
  ): Cache[TKey][TChildKey] | undefined {
    return get(key, defaultValue)?.[childKey];
  }
  function update<TKey extends CacheKeys>(key: TKey, value: Cache[TKey]): void {
    setCache(v => ({ ...v, [key]: value }));
  }
  function deleteItem<TKey extends CacheKeys>(key: TKey): void {
    setCache(v => {
      const update = { ...v };
      delete update[key];
      return update;
    });
  }
  function clear(): void {
    setCache({} as Cache);
  }
}

export function useCacheSaveEffect(cache: Cache) {
  const storage = useLocalStorage();

  useEffect(() => {
    localStorage.clear();
    for (const key in cache) {
      const value = cache[key as CacheKeys];
      if (value === undefined) {
        storage(key).remove();
        continue;
      }
      if (typeof value === 'object') for (const k in value) if (k.startsWith("_")) delete value[k];

      storage(key).set(value);
    }
  }, [cache]);
}

export function useCacheStoreToWindow(store: CacheStore) {
  useEffect(() => {
    window.__stores.CacheStore = store;
  }, [store]);
}