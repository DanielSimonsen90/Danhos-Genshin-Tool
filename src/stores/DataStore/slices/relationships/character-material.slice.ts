import StoreBuilder from "@/stores/StoreBuilder";
import charactersSlice from "../models/characters.slice";
import { Character } from "@/common/models";
import artifactMaterialSlice from "./artifact-material.slice";
import memoSlice from "../memo.slice";

export default new StoreBuilder()
  .addSlice(charactersSlice)
  .addSlice(artifactMaterialSlice)
  .addSlice(memoSlice)
  .addApi(({ get, api }) => {
    function getCharactersUsingMaterial(materialName: string) {
      const material = api.validateAndGetMaterial(materialName);
      if (!material) return [];

      return api.memoize(
        cacheKeys => cacheKeys.charactersUsingMaterial(materialName),
        () => get().Characters.filter(character => {
          const { crystal, localSpecialty, material: charMaterial, mobDrop, weeklyBossDrop, worldBossDrop } = character.ascension;
          const materials = [
            crystal,
            ...crystal.getCraftingTreeAsMaterials(),
            localSpecialty,
            charMaterial,
            mobDrop,
            weeklyBossDrop,
            worldBossDrop
          ].filter(Boolean);

          return materials.some(item => item?.name === materialName);
        }) as Character[]
      );
    }

    return {
      getCharactersUsingMaterial,
    };
  });