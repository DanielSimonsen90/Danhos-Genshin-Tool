import { useMemo } from 'react';
import { ModelKeys } from "@/common/models";
import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import Collapsible from "@/components/common/Collapsible";
import { SearchableCharacterList, SearchableWeaponList } from "@/components/domain/SearchableList";
import { useDataStore, useRegionStore } from "@/stores";
import { plural } from '@/common/functions/strings';

const modelKeys: Array<ModelKeys> = ['Character', 'Weapon'];

export default function FarmableTodaySection() {
  const DataStore = useDataStore();
  const RegionStore = useRegionStore();

  const farmableCharacters = useMemo(() => DataStore.Characters.filter(character =>
    Object.values(character.ascension)
      .some(material => AscensionMaterial.isAscensionMaterial(material) && material.isObtainableToday(RegionStore))
  ), [DataStore.Characters]);
  const farmableWeapons = useMemo(() => DataStore.Weapons.filter(weapon =>
    weapon.ascensionMaterials.some(material => AscensionMaterial.isAscensionMaterial(material) && material.isObtainableToday(RegionStore))
  ), [DataStore.Weapons]);

  return (
    <section className="farmable-today-section">
      <h2>These characters & weapons are farmable today</h2>
      {modelKeys.map(modelKey => (
        <Collapsible key={modelKey} className='farmable-model-collapsible' title={plural(2, modelKey)} defaultOpen>
          {
            modelKey === 'Character' ? <SearchableCharacterList items={farmableCharacters} cardProps={{
              wrapInLink: true,
            }} />
            : modelKey === 'Weapon' ? <SearchableWeaponList items={farmableWeapons} cardProps={{
              wrapInLink: true,
            }} />
            : null
          }
        </Collapsible>
      ))}
    </section>
  );
}