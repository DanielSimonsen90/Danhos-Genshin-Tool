import StoreBuilder, { type InferStoreType } from "../_baseStore/StoreBuilder";
import { DEFAULT_STATE } from "./CacheStoreConstants";
import slices from "./slices";

export const CacheStore = new StoreBuilder(DEFAULT_STATE)
  .addSlice(slices)
  .addPersistence({
    key: 'CacheStore',
  })
  .buildStore();

export default CacheStore;
export type CacheStoreType = InferStoreType<typeof CacheStore>;
export const useCacheStore = CacheStore.useStore;