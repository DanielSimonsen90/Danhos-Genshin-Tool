import { useMemo } from 'react';
import { ModelKeys } from "@/common/models";
import AscensionMaterial from "@/common/models/materials/AscensionMaterial";
import Collapsible from "@/components/common/Collapsible";
import { SearchableCharacterList, SearchableWeaponList } from "@/components/domain/SearchableList";
import { useDataStore } from "@/stores";
import { AccountStore, type AccountStoreType } from "@/stores/AccountStore/AccountStore";
import { plural } from '@/common/functions/strings';

const modelKeys: Array<ModelKeys> = ['Character', 'Weapon'];

type Props = {
  title?: string;
  day?: string;
};

export default function FarmableTodaySection(props: Props) {
  const { Characters, Weapons } = useDataStore(store => ({
    Characters: store.Characters,
    Weapons: store.Weapons
  }));

  const day = useMemo(() => {
    if (props.day) return props.day;

    const store = AccountStore.getState() as AccountStoreType;
    const worldRegion = store.selectedAccount.worldRegion;
    return store.getGenshinServerDayName(worldRegion);
  }, [props.day]);

  const title = props.title ?? `These characters & weapons are farmable today (${day})`;

  const farmableCharacters = useMemo(() => Characters.filter(character =>
    Object.values(character.ascension)
      .some(material => AscensionMaterial.isAscensionMaterial(material)
        && material.isObtainableOnDay(day)
      )
  ), [Characters, day]);
  const farmableWeapons = useMemo(() => Weapons.filter(weapon =>
    weapon.ascensionMaterials.some(material =>
      AscensionMaterial.isAscensionMaterial(material)
      && material.isObtainableOnDay(day)
    )
  ), [Weapons, day]);

  return (
    <section className="farmable-today-section">
      <h2>{title}</h2>
      {modelKeys.map(modelKey => (
        <Collapsible key={modelKey} className='farmable-model-collapsible' title={plural(2, modelKey)} defaultOpen>
          {
            modelKey === 'Character' ? <SearchableCharacterList key={`farmable-characters-${day}`} items={farmableCharacters} cardProps={{ wrapInLink: true }} />
            : modelKey === 'Weapon' ? <SearchableWeaponList key={`farmable-weapons-${day}`} items={farmableWeapons} cardProps={{ wrapInLink: true }} />
            : null
          }
        </Collapsible>
      ))}
    </section>
  );
}