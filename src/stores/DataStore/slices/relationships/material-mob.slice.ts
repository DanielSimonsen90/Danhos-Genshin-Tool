import StoreBuilder from "@/stores/StoreBuilder";
import materialsSlice from "../models/materials.slice";
import mobsSlice from "../models/mobs.slice";
import memoSlice from "../memo.slice";
import { Boss } from "@/common/models";

export default new StoreBuilder()
  .addSlice(materialsSlice)
  .addSlice(mobsSlice)
  .addSlice(memoSlice)
  .addApi(({ get, api }) => {
    function getMobsDroppingMaterial(materialName: string) {
      return api.memoize(
        cacheKeys => cacheKeys.mobsDroppingMaterial(materialName),
        () => get().Mobs.filter(mob => (
          mob.drops.some(drop => drop.name === materialName)
        ))
      );
    }

    function getBossesFromMaterial(materialName: string): Array<Boss> {
      return api.memoize(
        cacheKeys => cacheKeys.bossesFromMaterial(materialName),
        () => get().Mobs.filter(mob => (
          Boss.isBoss(mob)
          && mob.drops.some(drop => (
            drop.name === materialName
          ))
        )) as Array<Boss>
      );
    }

    return {
      getMobsDroppingMaterial,
      getBossesFromMaterial
    };
  });