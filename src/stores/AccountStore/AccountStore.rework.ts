import StoreBuilder from "../_baseStore/StoreBuilder";
import slices from "./slices";

export const AccountStore = new StoreBuilder()
  .addSlice(slices)
  .buildStore();