import StoreBuilder, { type InferStoreType } from "../_baseStore/StoreBuilder";
import slices from "./slices";

export const AccountStore = new StoreBuilder()
  .setStoreName('AccountStore')
  .addSlice(slices)
  .buildStore();

export type AccountStoreType = InferStoreType<typeof AccountStore>;
export const useAccountStore = AccountStore.useStore;