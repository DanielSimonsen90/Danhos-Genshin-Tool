import { SearchFormData } from "@/common/types/store-data";
import { SearchResult } from "@/services/SearchService/artifact";

export type DefaultValueString = '' | '{}';
export type CacheState = {
  searchHistory: Record<string, SearchFormData>;
  searchResults: Record<string, SearchResult>;
};

export type CacheKeys = keyof CacheState;
export type CacheItem = CacheState[CacheKeys];