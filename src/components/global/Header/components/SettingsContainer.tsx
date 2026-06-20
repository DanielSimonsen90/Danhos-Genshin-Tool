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
  const { accounts, selectedAccountName, selectedAccount, setSelectedAccount } = useAccountStore();
  const { traveler } = selectedAccount;

  const handleAccountChange = (accountName: string) => {
    setSelectedAccount(accountName);
  };

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
        onChange={handleAccountChange}
      />
      {selectedAccount.traveler ? <CharacterImage character={selectedAccount.traveler} /> : null}
      <SettingsCog role="button" tabIndex={0} {...addTabNavigation(() => setOpenModal(true), true)} />
    </div>
  ) : null;
}