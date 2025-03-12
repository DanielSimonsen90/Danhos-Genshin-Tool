import { SearchFormData } from "@/common/types/store-data";
import { SearchResult } from "@/services/SearchService";

export type CacheStore = Cache & {
  setCache: <TKey extends CacheKeys>(key: TKey, value: Cache[TKey]) => void;
  getCache: <TKey extends CacheKeys>(key: TKey) => Cache[TKey] | undefined;
  clearCache: () => void;

  has: <TKey extends CacheKeys>(key: TKey) => boolean;
  findObject: <TKey extends CacheKeys, TChildKey extends keyof Cache[TKey]>(
    key: TKey,
    callback: (obj: Cache[TKey][TChildKey]) => boolean
  ) => Cache[TKey][TChildKey] | undefined;
  set: <TKey extends CacheKeys>(key: TKey, value: Cache[TKey]) => void;
  get: <TKey extends CacheKeys>(key: TKey, defaultValue: any) => Cache[TKey] | undefined;
  getFromItem: <TKey extends CacheKeys, TChildKey extends keyof Cache[TKey]>(
    key: TKey,
    childKey: TChildKey,
    defaultValue: DefaultValueString
  ) => Cache[TKey][TChildKey] | undefined;
  update: <TKey extends CacheKeys>(key: TKey, value: Cache[TKey]) => void;
  delete: <TKey extends CacheKeys>(key: TKey) => void;
  load: <TKey extends CacheKeys>(key: TKey, defaultValue?: any) => void;
};

export type DefaultValueString = '' | '{}';
export type Cache = {
  searchHistory: Record<string, SearchFormData>;
  searchResults: Record<string, SearchResult>;
};

export type CacheKeys = keyof Cache;
export type CacheItem = Cache[CacheKeys];