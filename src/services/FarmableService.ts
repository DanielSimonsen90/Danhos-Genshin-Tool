import { List, Model } from "@/common/models";
import BaseService from "./BaseService";
import { useMemo } from "react";
import { useDataStore, useRegionStore } from "@/stores";
import AscensionMaterial from "@/common/models/materials/AscensionMaterial";

export default new class FarmableService extends BaseService<List<Model>> {
  public useFarmableCharacters() {
    const DataStore = useDataStore();
    const RegionStore = useRegionStore();

    return useMemo(() => DataStore.Characters.filter(character =>
      Object.values(character.ascension)
        .some(material => AscensionMaterial.isAscensionMaterial(material) && material.isObtainableToday(RegionStore))
    ), [DataStore.Characters, RegionStore.currentRegion]);
  }
  
  public useFarmableWeapons() {
    const DataStore = useDataStore();
    const RegionStore = useRegionStore();

    return useMemo(() => DataStore.Weapons.filter(weapon =>
      weapon.ascensionMaterials.some(material => AscensionMaterial.isAscensionMaterial(material) && material.isObtainableToday(RegionStore))
    ), [DataStore.Weapons, RegionStore.currentRegion]);
  }
}