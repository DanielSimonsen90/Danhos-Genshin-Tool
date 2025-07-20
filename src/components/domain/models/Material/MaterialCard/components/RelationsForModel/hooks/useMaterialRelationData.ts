import { useMemo } from "react";
import { ModelKeys, ModelData } from "@/common/models";
import { useDataStore } from "@/stores";

export function useMaterialMultiModelRelations<TModelKeys extends readonly ModelKeys[]>(
  materialName: string, 
  models: TModelKeys
) {
  const dataStore = useDataStore();
  return useMemo(() => {
    return models.map(model => {
      switch (model) {
        case 'Character': return dataStore.getCharactersUsingMaterial(materialName);
        case 'Weapon': return dataStore.getWeaponsUsingMaterial(materialName);
        case 'Mob': return dataStore.getMobsDroppingMaterial(materialName);
        case 'Domain': return [dataStore.getDomainDroppingMaterial(materialName)];
        default: return [];
      }
    }) as unknown as {
      [K in keyof TModelKeys]: TModelKeys[K] extends ModelKeys ? ModelData<TModelKeys[K]> : never;
    };
  }, [
    dataStore.getCharactersUsingMaterial,
    dataStore.getWeaponsUsingMaterial, 
    dataStore.getMobsDroppingMaterial,
    dataStore.getDomainDroppingMaterial,
    materialName,
    models
  ]);
}