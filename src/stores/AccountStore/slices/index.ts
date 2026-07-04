import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import accountCrudSlice from "./account.crud.slice";
import accountGetSlice from "./account.get.slice";
import accountSetSlice from "./account.set.slice";
import accountsSlice from "./accounts.slice";
import favoritesSlice from "./favorites.slice";

export default new StoreBuilder()
  .addSlice(accountsSlice)
  .addSlice(accountCrudSlice)
  .addSlice(accountGetSlice)
  .addSlice(accountSetSlice)
  .addSlice(favoritesSlice);