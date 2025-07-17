import { useMemo } from "react";
import { ModelKeys } from "@/common/models";
import { useDataStore } from "@/stores";

export function useMaterialRelationData<TModelKey extends ModelKeys>(model: TModelKey, materialName: string) {
  const dataStore = useDataStore();
  const data = useMemo(() => {
    switch (model) {
      case 'Character': return dataStore.getCharactersUsingMaterial(materialName);
      case 'Weapon': return dataStore.getWeaponsUsingMaterial(materialName);
      case 'Mob': return dataStore.getMobsDroppingMaterial(materialName);
      case 'Domain': return [dataStore.getDomainDroppingMaterial(materialName)];
      default: return [];
    }
  }, [
    dataStore.getCharactersUsingMaterial, 
    dataStore.getMobsDroppingMaterial, 
    dataStore.getDomainDroppingMaterial, 
    dataStore.getWeaponsUsingMaterial, 
    model, materialName
  ]);

  return data;
}