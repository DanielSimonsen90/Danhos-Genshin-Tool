import { Model } from "@/common/models";
import StoreBuilder from "../StoreBuilder";
import ModelType from "./ModelType";
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
export type DataStoreState = ReturnType<typeof DataStore.getState>;
export const useDataStore = DataStore.useStore;