import { Model } from "@/common/models";
import StoreBuilder, { type InferStoreType } from "../_baseStore/StoreBuilder";
import { ModelType } from "./ModelType";
import dataStoreSlice from './slices';  

const DataStore = new StoreBuilder()
  .addSlice(dataStoreSlice)
  .addApi(() => {
    function getModelType<TModel extends Model>(model: TModel) {
      return new ModelType<TModel>(model);
    }
    
    return {
      getModelType,
    }
  })
  .buildStore();

export default DataStore;
export type DataStoreType = InferStoreType<typeof DataStore>;
export const useDataStore = DataStore.useStore;