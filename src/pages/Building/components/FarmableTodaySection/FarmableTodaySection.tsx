import { useMemo } from 'react';
import { ModelKeys } from "@/common/models";
import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import Collapsible from "@/components/common/Collapsible";
import { SearchableCharacterList, SearchableWeaponList } from "@/components/domain/SearchableList";
import { useDataStore, useAccountStore } from "@/stores";
import { plural } from '@/common/functions/strings';

const modelKeys: Array<ModelKeys> = ['Character', 'Weapon'];

type Props = {
  title?: string;
  day?: string;
};

export default function FarmableTodaySection(props: Props) {
  const DataStore = useDataStore();
  const AccountStore = useAccountStore();

  const title = props.title ?? `These characters & weapons are farmable today (${AccountStore.getGenshinServerDayName(AccountStore.worldRegion)})`;
  const day = props.day ?? AccountStore.getGenshinServerDayName(AccountStore.worldRegion);

  const farmableCharacters = useMemo(() => DataStore.Characters.filter(character =>
    Object.values(character.ascension)
      .some(material => AscensionMaterial.isAscensionMaterial(material)
        && material.isObtainableOnDay(day)
      )
  ), [DataStore.Characters, AccountStore.worldRegion]);
  const farmableWeapons = useMemo(() => DataStore.Weapons.filter(weapon =>
    weapon.ascensionMaterials.some(material =>
      AscensionMaterial.isAscensionMaterial(material)
      && material.isObtainableOnDay(day)
    )
  ), [DataStore.Weapons, AccountStore.worldRegion]);

  return (
    <section className="farmable-today-section">
      <h2>{title}</h2>
      {modelKeys.map(modelKey => (
        <Collapsible key={modelKey} className='farmable-model-collapsible' title={plural(2, modelKey)} defaultOpen>
          {
            modelKey === 'Character' ? <SearchableCharacterList key={`${AccountStore.worldRegion}-farmable-characters-${day}`} items={farmableCharacters} cardProps={{
              wrapInLink: true,
            }} />
              : modelKey === 'Weapon' ? <SearchableWeaponList key={`${AccountStore.worldRegion}-farmable-weapons-${day}`} items={farmableWeapons} cardProps={{
                wrapInLink: true,
              }} />
                : null
          }
        </Collapsible>
      ))}
    </section>
  );
}