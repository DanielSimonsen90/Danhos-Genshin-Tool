import { SearchFormData } from "@/common/types/store-data";

export type DefaultValueString = '' | '{}';
export type CacheState = {
  searchHistory: Record<string, SearchFormData>;
};

export type CacheKeys = keyof CacheState;
export type CacheItem = CacheState[CacheKeys];