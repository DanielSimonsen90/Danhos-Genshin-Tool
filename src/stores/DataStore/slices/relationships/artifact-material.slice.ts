import StoreBuilder from "@/stores/StoreBuilder";
import artifactsSlice from "../models/artifacts.slice";
import materialsSlice from "../models/materials.slice";
import { Material } from "@/common/models/materials/Material";

export default new StoreBuilder()
  .addSlice(artifactsSlice)
  .addSlice(materialsSlice)
  .addApi(({ get, api }) => {
    const validateAndGetMaterial = (materialName: string): Material | undefined => {
      const material = api.findMaterialByName(materialName, true) ?? api.findArtifactByName(materialName);
      if (!material) console.warn(`Material "${materialName}" not found.`, get().Materials);
      return material;
    };

    return {
      validateAndGetMaterial,
    };
  });