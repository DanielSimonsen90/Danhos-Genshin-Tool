import { DebugLog } from "@/common/functions/dev";

import SettingsCog from "@/components/common/media/icons/SettingsCog";
import { CharacterImage } from "@/components/common/media/Images";
import { useAccountStore } from "@/stores/AccountStore";

import SettingsOption from "../../../../stores/SettingsStore/components/SettingsModal/components/SettingsOption";
import { addTabNavigation } from "@/common/functions/accessibility";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsContainer);

type Props = {
  setOpenModal: (open: boolean) => void;
};

export default function SettingsContainer({ setOpenModal }: Props) {
  const worldRegion = useAccountStore(state => state.accountData.worldRegion);
  const traveler = useAccountStore(state => state.accountData.traveler);
  const setWorldRegion = useAccountStore(state => state.setWorldRegion);

  debugLog(
    worldRegion
      ? 'SettingsContainer rendered'
      : 'SettingsContainer did not render',
    { worldRegion, traveler }
  );

  return worldRegion ? (
    <div className="settings-container">
      <SettingsOption setting="worldRegion" value={worldRegion} setValue={setWorldRegion} hideLabel accountNames={undefined} />
      {traveler ? <CharacterImage character={traveler} /> : null}
      <SettingsCog role="button" tabIndex={0} {...addTabNavigation(() => setOpenModal(true), true)} />
    </div>
  ) : null;
}