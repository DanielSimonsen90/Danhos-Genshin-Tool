import { useMemo } from "react";
import { Character, Mob, ModelKeys } from "@/common/models";
import { DataStore, useDataStore } from "@/stores";

export function useMaterialRelationData<TModelKey extends ModelKeys>(model: TModelKey, materialName: string) {
  const dataStore = useDataStore();
  const data = useMemo(() => {
    switch (model) {
      case 'Character': return dataStore.getCharactersUsingMaterial(materialName);
      case 'Mob': return dataStore.getMobsDroppingMaterial(materialName);
      default: return [];
    }
  }, [dataStore.getCharactersUsingMaterial, dataStore.getMobsDroppingMaterial, model, materialName]);

  return data as any as Array<DataStore[`${TModelKey}sData`]>;
}