import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import getSlice from "./get.slice";
import setSlice from "./set.slice";

export default new StoreBuilder()
  .addSlice(getSlice)
  .addSlice(setSlice);