import StoreBuilder from "@/stores/StoreBuilder";
import materialsSlice from "../models/materials.slice";
import weaponsSlice from "../models/weapons.slice";
import artifactMaterialSlice from "./artifact-material.slice";
import memoSlice from "../memo.slice";
import { Weapon } from "@/common/models";

export default new StoreBuilder()
  .addSlice(artifactMaterialSlice)
  .addSlice(weaponsSlice)
  .addSlice(memoSlice)
  .addApi(({ get, api }) => {
    function getWeaponsUsingMaterial(materialName: string) {
      const material = api.validateAndGetMaterial(materialName);
      if (!material) return [];

      return api.memoize(
        cacheKeys => cacheKeys.materialWeapons(materialName),
        () => get().Weapons.filter(weapon => (
          weapon.ascensionMaterials.some(
            ascensionMaterial => ascensionMaterial.name === materialName
          )
        )) as Array<Weapon>
      )
    }

    return {
      getWeaponsUsingMaterial,
    }
  })