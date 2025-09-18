import { ModelKeys } from "@/common/models";
import Collapsible from "@/components/common/Collapsible";
import { SearchableCharacterList, SearchableWeaponList } from "@/components/domain/SearchableList";
import { useRegionStore } from "@/stores";
import FarmableService from '@/services/FarmableService';
import { plural } from '@/common/functions/strings';

const modelKeys: Array<ModelKeys> = ['Character', 'Weapon'];

export default function FarmableTodaySection() {
  const RegionStore = useRegionStore();
  const farmableCharacters = FarmableService.useFarmableCharacters();
  const farmableWeapons = FarmableService.useFarmableWeapons();

  return (
    <section className="farmable-today-section">
      <h2>These characters & weapons are farmable today</h2>
      {modelKeys.map(modelKey => (
        <Collapsible key={modelKey} className='farmable-model-collapsible' title={plural(2, modelKey)} defaultOpen>
          {
            modelKey === 'Character' ? <SearchableCharacterList key={`${RegionStore.currentRegion}-farmable-characters`} items={farmableCharacters} cardProps={{
              wrapInLink: true,
            }} />
            : modelKey === 'Weapon' ? <SearchableWeaponList key={`${RegionStore.currentRegion}-farmable-weapons`} items={farmableWeapons} cardProps={{
              wrapInLink: true,
            }} />
            : null
          }
        </Collapsible>
      ))}
    </section>
  );
}