import { ModelKeys } from "@/common/models";
import StoreBuilder from "@/stores/StoreBuilder";
import artifactMaterialSlice from "./artifact-material.slice";
import characterMaterialSlice from "./character-material.slice";
import domainMaterialSlice from "./domain-material.slice";
import materialMobSlice from "./material-mob.slice";
import materialWeaponSlice from "./material-weapon.slice";

export default new StoreBuilder()
  .addSlice(artifactMaterialSlice)
  .addSlice(characterMaterialSlice)
  .addSlice(domainMaterialSlice)
  .addSlice(materialMobSlice)
  .addSlice(materialWeaponSlice)
  .addApi(({ api }) => {
    function getModelKeysUsingMaterial(materialName: string): Array<ModelKeys> {
      const modelKeys: Array<ModelKeys> = [];
      
      const material = api.findMaterialByName(materialName);
      if (!material) return modelKeys;

      if (api.getCharactersUsingMaterial(materialName).length) modelKeys.push('Character');
      if (api.getDomainDroppingMaterial(materialName)) modelKeys.push('Domain');
      if (api.getMobsDroppingMaterial(materialName).length) modelKeys.push('Mob');
      if (api.getWeaponsUsingMaterial(materialName).length) modelKeys.push('Weapon');
      
      return modelKeys;
    }

    return {
      getModelKeysUsingMaterial,
    }
  })