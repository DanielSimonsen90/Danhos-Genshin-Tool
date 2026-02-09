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
  const accountData = useAccountStore(state => state.accountData);
  const traveler = useAccountStore(state => state.accountData.traveler);
  const setSelectedAccount = useAccountStore(state => state.setSelectedAccount);

  debugLog(
    accountData.worldRegion
      ? 'SettingsContainer rendered'
      : 'SettingsContainer did not render',
    { worldRegion: accountData.worldRegion, traveler }
  );

  return accountData ? (
    <div className="settings-container">
      <Select name="selected-account"
        options={Object.keys(accounts)}
        value={selectedAccountName}
        onChange={setSelectedAccount}
      />
      {accountData.traveler ? <CharacterImage character={accountData.traveler} /> : null}
      <SettingsCog role="button" tabIndex={0} {...addTabNavigation(() => setOpenModal(true), true)} />
    </div>
  ) : null;
}