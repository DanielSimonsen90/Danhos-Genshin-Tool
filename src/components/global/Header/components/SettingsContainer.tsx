import { DebugLog } from "@/common/functions/dev";

import SettingsCog from "@/components/common/icons/SettingsCog";
import { CharacterImage } from "@/components/common/Images";
import { useRegionStore } from "@/stores/RegionStore";

import SettingsOption from "../../../../stores/SettingsStore/components/SettingsModal/SettingsOption";
import { addTabNavigation } from "@/common/functions/accessibility";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsContainer);

type Props = {
  setOpenModal: (open: boolean) => void;
}

export default function SettingsContainer({ setOpenModal }: Props) {
  const RegionStore = useRegionStore();
  const { regionData: { region, traveler }, setRegion } = RegionStore;

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
      <SettingsCog role="button" tabIndex={0} {...addTabNavigation(() => setOpenModal(true), true)} />
    </div>
  ) : null;
}