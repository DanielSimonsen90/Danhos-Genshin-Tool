import SettingsCog from "@/components/common/icons/SettingsCog";
import { CharacterImage } from "@/components/common/Images";
import { useRegionStore } from "@/stores/RegionStore";
import SettingsOption from "./SettingsModal/SettingsOption";
import { DebugLog } from "@/common/functions/dev";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsContainer);

type Props = {
  setOpenModal: (open: boolean) => void;
}

export default function SettingsContainer({ setOpenModal }: Props) {
  const { region, setRegion, traveler } = useRegionStore();
  
  debugLog(
    region
      ? 'SettingsContainer rendered'
      : 'SettingsContainer did not render',
    { region, traveler }
  )

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