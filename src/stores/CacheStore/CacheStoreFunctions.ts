import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Cache, CacheKeys, CacheStore, DefaultValueString } from "./CacheStoreTypes";
import { Dispatch, SetStateAction, useEffect } from "react";

export function useCacheFunctions(cache: Cache, setCache: Dispatch<SetStateAction<Cache>>) {
  useCacheSaveEffect(cache);
  const storage = useLocalStorage();

  return {
    has, findObject,
    set, get, getFromItem, update, delete: deleteItem, 
    clear, load
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
  function get<TKey extends CacheKeys>(key: TKey, defaultValue: any): Cache[TKey] | undefined {
    // if (!has(key)) setCache(v => ({ ...v, [key]: defaultValue })); -- Throws "bad useState" error
    return cache[key] ?? defaultValue;
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
    setCache(v => ({ ...v, [key]: typeof value === 'object' ? { ...v[key], ...value } : value }));
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

  function load<TKey extends CacheKeys>(key: TKey, defaultValue: DefaultValueString): void {
    if (!get(key, undefined)) setCache(v => ({ ...v, [key]: storage(key).load(defaultValue) }));
  }
}

export function useCacheSaveEffect(cache: Cache) {
  const storage = useLocalStorage();

  useEffect(() => {
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