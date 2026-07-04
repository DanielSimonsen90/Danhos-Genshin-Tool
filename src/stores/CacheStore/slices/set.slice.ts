import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { CacheState } from "../CacheStoreTypes";
import getSlice from "./get.slice";
import { DEFAULT_STATE } from "../CacheStoreConstants";

export default new StoreBuilder<CacheState>()
  .addSlice(getSlice)
  .addApi(({ set, api }) => {
    function clearCache() {
      set(DEFAULT_STATE);
    }
    
    function setItem<TKey extends keyof CacheState>(key: TKey, value: CacheState[TKey]) {
      set(state => ({ ...state, [key]: value }));
    }

    function updateItem<TKey extends keyof CacheState>(key: TKey, value: CacheState[TKey]) {
      set(state => ({ 
        ...state, 
        [key]: typeof state[key] === 'object' && typeof value === 'object' 
          ? { ...state[key] as Object, ...value as Object } 
          : value 
      }));
    }

    function deleteItem<TKey extends keyof CacheState>(key: TKey) {
      set(state => {
        const { [key]: _, ...updatedState } = state;
        return updatedState;
      });
    }

    function loadItem<TKey extends keyof CacheState>(key: TKey, defaultValue?: any) {
      if (!api.has(key)) setItem(key, defaultValue);
    }

    function evictExpired(daysToKeep: number) {
      if (daysToKeep === 0) return;

      const cutoff = Date.now() - daysToKeep * 86_400_000; // 86,400,000 ms in a day
      
      set(state => ({
        ...state,
        searchHistory: Object.fromEntries(
          Object.entries(state.searchHistory).filter(([, entry]) => (entry.timestamp ?? 0) >= cutoff)
        ),
      }));
    }

    return {
      clearCache,
      evictExpired,
      set: setItem,
      update: updateItem,
      delete: deleteItem,
      load: loadItem,
    }
  })