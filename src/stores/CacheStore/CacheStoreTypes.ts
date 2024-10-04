import { SearchFormData } from "@/common/types/store-data";
import { SearchResult } from "@/services/SearchService";
import { useCacheFunctions } from './CacheStoreFunctions'

export type CacheStore = ReturnType<typeof useCacheFunctions>;

export type DefaultValueString = '' | '{}';
export type Cache = {
  searchHistory: Record<string, SearchFormData>;
  searchResults: Record<string, SearchResult>;
  clearRequested: boolean;
};

export type CacheKeys = keyof Cache;
export type CacheItem = Cache[CacheKeys];