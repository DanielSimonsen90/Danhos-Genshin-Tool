import { useMemo } from 'react';
import { Select } from '@/components/common/FormItems';
import { CharacterImage } from '@/components/common/media/Images';
import { AccountContextType, AccountData } from '@/stores/AccountStore/AccountStoreTypes';

type Props = {
  accounts: AccountContextType;
  selectedAccountName: string;
  onChange: (accountName: string) => void;
};

export default function AccountSwitcher({ accounts, selectedAccountName, onChange }: Props) {
  const selectedAccount = accounts[selectedAccountName] as AccountData | undefined;
  const avatar = useMemo(
    () => selectedAccount?.avatar ?? selectedAccount?.traveler,
    [selectedAccount],
  );

  return (
    <div className="account-switcher">
      <Select
        name="selected-account"
        options={Object.keys(accounts)}
        value={selectedAccountName}
        onChange={onChange}
      />
      {avatar && <CharacterImage character={avatar} />}
    </div>
  );
}
