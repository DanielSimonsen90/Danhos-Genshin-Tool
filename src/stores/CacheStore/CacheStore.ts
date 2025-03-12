import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cache, CacheKeys, CacheStore, DefaultValueString } from "./CacheStoreTypes";

export const useCacheStore = create<CacheStore>()(persist((setState, getState) => {
  const setCache = <TKey extends CacheKeys>(key: TKey, value: Cache[TKey]) => setState(state => ({ ...state, [key]: value }));
  const getCache = <TKey extends CacheKeys>(key: TKey): Cache[TKey] | undefined => getState()[key];
  const clearCache = () => setState({} as Cache);

  const has = <TKey extends CacheKeys>(key: TKey): boolean => !!getState()[key];
  const findObject = <TKey extends CacheKeys, TChildKey extends keyof Cache[TKey]>(
    key: TKey,
    callback: (obj: Cache[TKey][TChildKey]) => boolean
  ): Cache[TKey][TChildKey] | undefined => {
    const item = getState()[key];

    if (typeof item !== 'object' && !Array.isArray(item)) return undefined;
    return Object.values(item).find(callback) as Cache[TKey][TChildKey];
  };
  const set = <TKey extends CacheKeys>(key: TKey, value: Cache[TKey]): void => setState(state => ({ ...state, [key]: value }));
  const get = <TKey extends CacheKeys>(key: TKey, defaultValue: any): Cache[TKey] | undefined => getState()[key] ?? defaultValue;
  const getFromItem = <TKey extends CacheKeys, TChildKey extends keyof Cache[TKey]>(
    key: TKey,
    childKey: TChildKey,
    defaultValue: DefaultValueString
  ): Cache[TKey][TChildKey] | undefined => get(key, defaultValue)?.[childKey];
  const update = <TKey extends CacheKeys>(key: TKey, value: Cache[TKey]): void => setState(state => ({ 
    ...state, 
    [key]: typeof state[key] === 'object' && typeof value === 'object' 
      ? { ...state[key] as Object, ...value as Object } 
      : value 
  }));
  const deleteItem = <TKey extends CacheKeys>(key: TKey): void => setState(state => {
    const update = { ...state };
    delete update[key];
    return update;
  });
  const load = <TKey extends CacheKeys>(key: TKey, defaultValue?: any): void => {
    if (!has(key)) set(key, defaultValue);
  }

  return ({
    searchHistory: {},
    searchResults: {},

    setCache, getCache, clearCache,

    has, findObject,
    set, get, getFromItem, update, delete: deleteItem,
    load
  });
}, {
  name: 'CacheStore',
}));

export default useCacheStore;