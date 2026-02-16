import StoreBuilder from "@/stores/StoreBuilder";
import artifactsSlice from "./artifacts.slice";
import charactersSlice from "./characters.slice";
import domainsSlice from "./domains.slice";
import materialsSlice from "./materials.slice";
import mobsSlice from "./mobs.slice";
import weaponsSlice from "./weapons.slice";

export default new StoreBuilder()
  .addSlice(artifactsSlice)
  .addSlice(charactersSlice)
  .addSlice(domainsSlice)
  .addSlice(materialsSlice)
  .addSlice(mobsSlice)
  .addSlice(weaponsSlice);