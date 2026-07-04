import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import actionsSlice from "./actions.slice";
import computedSlice from "./computed.slice";
import stateSlice from "./state.slice";

export default new StoreBuilder()
  .addSlice(stateSlice)
  .addSlice(computedSlice)
  .addSlice(actionsSlice);