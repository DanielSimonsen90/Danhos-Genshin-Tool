import { DebugLog } from "@/common/functions/dev";

import { SettingsCog } from "@/components/common/media/icons";
import { CharacterImage } from "@/components/common/media/Images";
import { useAccountStore } from "@/stores/AccountStore";

import { addTabNavigation } from "@/common/functions/accessibility";
import { Select } from "@/components/common/FormItems";
import { useMemo } from "react";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsContainer);

type Props = {
  setOpenModal: (open: boolean) => void;
};

export default function SettingsContainer({ setOpenModal }: Props) {
  const { accounts, selectedAccountName, selectedAccount, setSelectedAccount } = useAccountStore();
  const avatar = useMemo(() => selectedAccount.avatar ?? selectedAccount.traveler, [selectedAccount]);

  const handleAccountChange = (accountName: string) => {
    setSelectedAccount(accountName);
  };

  debugLog(
    selectedAccount.worldRegion
      ? 'SettingsContainer rendered'
      : 'SettingsContainer did not render',
    selectedAccount,
  );
  
  return selectedAccount ? (
    <div className="settings-container">
      <Select name="selected-account"
        options={Object.keys(accounts)}
        value={selectedAccountName}
        onChange={handleAccountChange}
      />
      {avatar ? <CharacterImage character={avatar} /> : null}
      <SettingsCog role="button" tabIndex={0} {...addTabNavigation(() => setOpenModal(true), true)} />
    </div>
  ) : null;
}