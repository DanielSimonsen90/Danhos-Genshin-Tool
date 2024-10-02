import { SearchFormData } from "@/common/types/store-data";
import { SearchResult } from "@/services/SearchService";
import type CacheStore from "./CacheStore";
import { BaseEventsMap } from "../BaseStore";

export type CacheStoreProviderContextType = CacheStore;

export type DefaultValueString = '' | '{}';
export type Cache = {
  searchHistory: Record<string, SearchFormData>;
  searchResults: Record<string, SearchResult>;
  currentSearch: string;
};

export type CacheKeys = keyof Cache;
export type CacheItem = Cache[CacheKeys];

export type CacheEventsMap = BaseEventsMap & {
  set: [key: CacheKeys, value: CacheItem];
  update: [value: CacheItem, key: CacheKeys];
  delete: [key: CacheKeys];
  clear: [];
};