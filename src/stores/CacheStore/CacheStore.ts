import StoreBuilder from "../StoreBuilder";
import { DEFAULT_STATE } from "./CacheStoreConstants";
import { CacheState } from "./CacheStoreTypes";
import slices from "./slices";

export const CacheStore = new StoreBuilder(DEFAULT_STATE)
  .addSlice(slices)
  .addPersistence({
    key: 'CacheStore',
    version: 1,
  })
  .buildStore();

export default CacheStore;
export type CacheStoreType = ReturnType<typeof CacheStore.getAccumulatedStore>;
export const useCacheStore = CacheStore.useStore;