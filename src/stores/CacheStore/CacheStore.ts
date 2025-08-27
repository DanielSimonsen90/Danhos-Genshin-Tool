import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cache, CacheKeys, CacheStore, DefaultValueString } from "./CacheStoreTypes";

const LOCAL_STORAGE_KEY = 'CacheStore';

export const useCacheStore = create<CacheStore>()(persist((setState, getState) => {
  const clearCache = () => {
    setState({
      searchHistory: {},
      searchResults: {}
    } as Cache);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  const has = <TKey extends CacheKeys>(key: TKey): boolean => !!getState()[key] && (typeof getState()[key] !== 'object' || Object.keys(getState()[key]).length > 0);
  const findObject = <TKey extends CacheKeys, TChildKey extends keyof Cache[TKey]>(
    key: TKey,
    callback: (obj: Cache[TKey][TChildKey]) => boolean
  ): Cache[TKey][TChildKey] | undefined => {
    const item = getState()[key];

    if (typeof item !== 'object' && !Array.isArray(item)) return undefined;
    return Object.values(item).find(callback) as Cache[TKey][TChildKey];
  };
  const set = <TKey extends CacheKeys>(key: TKey, value: Cache[TKey]): void => setState(state => ({ ...state, [key]: value }));
  const get = <TKey extends CacheKeys>(key: TKey, defaultValue: any): Cache[TKey] => getState()[key] ?? defaultValue;
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
    const { [key]: _, ...rest } = state;
    return rest;
  });
  const load = <TKey extends CacheKeys>(key: TKey, defaultValue?: any): void => {
    if (!has(key)) set(key, defaultValue);
  }

  return ({
    searchHistory: {},
    searchResults: {},

    clearCache,

    has, findObject,
    set, get, getFromItem, update, delete: deleteItem,
    load
  });
}, {
  name: LOCAL_STORAGE_KEY,
}));

export default useCacheStore;