import StoreBuilder from "../_baseStore/StoreBuilder";
import slices from "./slices";

export const AccountStore = new StoreBuilder()
  .addSlice(slices)
  .buildStore();

export type AccountStoreType = ReturnType<typeof AccountStore.getAccumulatedStore>;
export const useAccountStore = AccountStore.useStore;