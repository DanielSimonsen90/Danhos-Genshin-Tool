import { DebugLog } from "@/common/functions/dev";

import { SettingsCog } from "@/components/common/media/icons";
import { CharacterImage } from "@/components/common/media/Images";
import { useAccountStore } from "@/stores/AccountStore";

import { addTabNavigation } from "@/common/functions/accessibility";
import { Select } from "@/components/common/FormItems";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsContainer);

type Props = {
  setOpenModal: (open: boolean) => void;
};

export default function SettingsContainer({ setOpenModal }: Props) {
  const accounts = useAccountStore(state => state.accounts);
  const selectedAccountName = useAccountStore(state => state.selectedAccountName);
  const selectedAccount = useAccountStore(state => state.selectedAccount);
  const traveler = useAccountStore(state => state.selectedAccount.traveler);
  const setSelectedAccount = useAccountStore(state => state.setSelectedAccount);

  debugLog(
    selectedAccount.worldRegion
      ? 'SettingsContainer rendered'
      : 'SettingsContainer did not render',
    { worldRegion: selectedAccount.worldRegion, traveler }
  );

  return selectedAccount ? (
    <div className="settings-container">
      <Select name="selected-account"
        options={Object.keys(accounts)}
        value={selectedAccountName}
        onChange={setSelectedAccount}
      />
      {selectedAccount.traveler ? <CharacterImage character={selectedAccount.traveler} /> : null}
      <SettingsCog role="button" tabIndex={0} {...addTabNavigation(() => setOpenModal(true), true)} />
    </div>
  ) : null;
}