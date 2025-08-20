import { useMemo } from 'react';
import { ModelKeys } from "@/common/models";
import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import Collapsible from "@/components/common/Collapsible";
import { SearchableCharacterList, SearchableWeaponList } from "@/components/domain/SearchableList";
import { useDataStore, useRegionStore } from "@/stores";
import { plural } from '@/common/functions/strings';

const modelKeys: Array<ModelKeys> = ['Character', 'Weapon'];

type Props = {
  title?: string;
  day?: string;
};

export default function FarmableTodaySection(props: Props) {
  const DataStore = useDataStore();
  const RegionStore = useRegionStore();

  const title = props.title ?? `These characters & weapons are farmable today (${RegionStore.getGenshinServerDayName(RegionStore.currentRegion)})`;
  const day = props.day ?? RegionStore.getGenshinServerDayName(RegionStore.currentRegion);

  const farmableCharacters = useMemo(() => DataStore.Characters.filter(character =>
    Object.values(character.ascension)
      .some(material => AscensionMaterial.isAscensionMaterial(material)
        && material.isObtainableOnDay(day)
      )
  ), [DataStore.Characters, RegionStore.currentRegion]);
  const farmableWeapons = useMemo(() => DataStore.Weapons.filter(weapon =>
    weapon.ascensionMaterials.some(material =>
      AscensionMaterial.isAscensionMaterial(material)
      && material.isObtainableOnDay(day)
    )
  ), [DataStore.Weapons, RegionStore.currentRegion]);

  return (
    <section className="farmable-today-section">
      <h2>{title}</h2>
      {modelKeys.map(modelKey => (
        <Collapsible key={modelKey} className='farmable-model-collapsible' title={plural(2, modelKey)} defaultOpen>
          {
            modelKey === 'Character' ? <SearchableCharacterList key={`${RegionStore.currentRegion}-farmable-characters-${day}`} items={farmableCharacters} cardProps={{
              wrapInLink: true,
            }} />
              : modelKey === 'Weapon' ? <SearchableWeaponList key={`${RegionStore.currentRegion}-farmable-weapons-${day}`} items={farmableWeapons} cardProps={{
                wrapInLink: true,
              }} />
                : null
          }
        </Collapsible>
      ))}
    </section>
  );
}