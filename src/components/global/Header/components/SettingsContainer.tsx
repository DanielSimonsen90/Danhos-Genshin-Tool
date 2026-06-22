import { DebugLog } from "@/common/functions/dev";

import { SettingsCog } from "@/components/common/media/icons";
import { useAccountStore } from "@/stores/AccountStore";
import { addTabNavigation } from "@/common/functions/accessibility";
import AccountSwitcher from "@/components/common/AccountSwitcher";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsContainer);

type Props = {
  setOpenModal: (open: boolean) => void;
};

export default function SettingsContainer({ setOpenModal }: Props) {
  const { accounts, selectedAccountName, selectedAccount, setSelectedAccount } = useAccountStore();

  debugLog(
    selectedAccount.worldRegion
      ? 'SettingsContainer rendered'
      : 'SettingsContainer did not render',
    selectedAccount,
  );

  return selectedAccount ? (
    <div className="settings-container">
      <AccountSwitcher
        accounts={accounts}
        selectedAccountName={selectedAccountName}
        onChange={setSelectedAccount}
      />
      <SettingsCog role="button" tabIndex={0} {...addTabNavigation(() => setOpenModal(true), true)} />
    </div>
  ) : null;
}