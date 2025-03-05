import SettingsCog from "@/components/common/icons/SettingsCog";
import { CharacterImage } from "@/components/common/Images";
import SettingsOption from "./SettingsModal/SettingsOption";
import { useRegionStore } from "@/stores/RegionStore";

type Props = {
  setOpenModal: (open: boolean) => void;
}

export default function SettingsContainer({ setOpenModal }: Props) {
  const { region, setRegion, traveler } = useRegionStore();
  
  return region ? (
    <div className="settings-container">
      <SettingsOption setting="region" value={region} setValue={setRegion} hideLabel />
      {traveler ? <CharacterImage character={traveler} /> : null}
      <SettingsCog role="button" tabIndex={0} onClick={() => setOpenModal(true)} onKeyDown={e => {
        if (e.key === 'Enter' || e.key === 'NumpadEnter' || e.key === ' ') setOpenModal(true);
      }} />
    </div>
  ) : null;
}