import { useCallback } from 'react';

import { Select } from '@/components/common/FormItems';
import { CharacterImage } from '@/components/common/media/Images';
import AvatarSelector from '@/components/domain/AvatarSelector';
import AccountSwitcher from '@/components/domain/AccountSwitcher';

import { AccountContextType, AccountData, Traveler, WorldRegion } from '@/stores/AccountStore/AccountStoreTypes';
import { DEFAULT_ACCOUNT_DATA, WORLD_REGIONS } from '@/stores/AccountStore/AccountStoreConstants';
import { generateAccountId } from '@/stores/AccountStore/AccountStoreFunctions';
import { useStateReset } from '@/hooks/useStateReset';

const TRAVELER_OPTIONS: Traveler[] = ['lumine', 'aether'];
const displayTravelerValue = (value: Traveler) => value.charAt(0).toUpperCase() + value.slice(1);
const displayWorldRegion = (region: string) => {
  switch (region) {
    case 'Europe': return `🌍 ${region}`;
    case 'North America': return `🌎 ${region}`;
    case 'Asia': return `🌏 ${region}`;
    case 'TW, HK, MO': return `🌏 ${region}`;
    default: return `🌐 ${region}`;
  }
};

export type AccountSettingsProps = {
  pendingAccounts?: AccountContextType;
  pendingSelectedAccountName?: string;
  onAccountSelect?: (name: string) => void;
  onAccountAdd?: (name: string, data: AccountData) => void;
  onAccountDelete?: (name: string) => void;
  onAccountRename?: (oldName: string, newName: string) => void;
  onAccountDataChange?: (name: string, update: Partial<AccountData>) => void;
};

export default function AccountSettings({
  pendingAccounts = {},
  pendingSelectedAccountName = '',
  onAccountSelect,
  onAccountAdd,
  onAccountDelete,
  onAccountRename,
  onAccountDataChange,
}: AccountSettingsProps) {
  const pendingAccount = pendingAccounts[pendingSelectedAccountName] as AccountData | undefined;
  const [accountName, setAccountName, resetAccountName] = useStateReset(pendingSelectedAccountName);

  const handleAccountSelect = useCallback((name: string) => {
    onAccountSelect?.(name);
    resetAccountName(name);
  }, [onAccountSelect, resetAccountName]);

  const handleAccountNameBlur = useCallback((newName: string) => {
    const trimmed = newName.trim();
    if (trimmed && trimmed !== pendingSelectedAccountName) {
      if (trimmed in pendingAccounts) {
        resetAccountName(pendingSelectedAccountName);
        return;
      }
      
      onAccountRename?.(pendingSelectedAccountName, trimmed);
    } else {
      resetAccountName(pendingSelectedAccountName);
    }
  }, [onAccountRename, pendingSelectedAccountName, pendingAccounts, resetAccountName]);

  const handleAccountAdd = useCallback(() => {
    const existingNames = Object.keys(pendingAccounts);
    let counter = existingNames.length + 1;
    let newName = `Account ${counter}`;
    while (existingNames.includes(newName)) {
      counter++;
      newName = `Account ${counter}`;
    }
    onAccountAdd?.(newName, { ...DEFAULT_ACCOUNT_DATA, id: generateAccountId() });
    resetAccountName(newName);
  }, [pendingAccounts, onAccountAdd, resetAccountName]);

  const handleAccountDelete = useCallback(() => {
    onAccountDelete?.(pendingSelectedAccountName);
  }, [pendingSelectedAccountName, onAccountDelete]);

  return (
    <section className="account-settings">
      <header>
        <AccountSwitcher
          accounts={pendingAccounts}
          selectedAccountName={pendingSelectedAccountName}
          onChange={handleAccountSelect}
        />
      </header>
      <div className="sub-header">
        <div className="input-group setting-traveler">
          <CharacterImage character={pendingAccount?.traveler ?? DEFAULT_ACCOUNT_DATA.traveler!} />
          <Select
            name="traveler"
            options={TRAVELER_OPTIONS}
            displayValue={displayTravelerValue}
            value={pendingAccount?.traveler}
            onChange={v => onAccountDataChange?.(pendingSelectedAccountName, { traveler: v as Traveler })}
          />
        </div>
        <div className="input-group setting-selectedAccountName">
          <label>Account Name</label>
          <input
            type="text"
            name="selectedAccountName"
            value={accountName}
            onChange={e => setAccountName(e.target.value)}
            onBlur={e => handleAccountNameBlur(e.target.value)}
          />
        </div>
      </div>
      <div className="input-group setting-worldRegion">
        <label>World Region</label>
        <Select
          name="worldRegion"
          options={WORLD_REGIONS}
          displayValue={displayWorldRegion}
          value={pendingAccount?.worldRegion}
          onChange={v => onAccountDataChange?.(pendingSelectedAccountName, { worldRegion: v as WorldRegion })}
        />
      </div>
      <div className="input-group setting-avatar">
        <label>Avatar</label>
        <AvatarSelector
          selectedAvatar={pendingAccount?.avatar}
          onSelect={avatar => onAccountDataChange?.(pendingSelectedAccountName, { avatar })}
        />
      </div>
      <footer>
        <div className="input-group button-panel" onClick={e => e.stopPropagation()}>
          <button type="button" className="secondary danger" onClick={handleAccountDelete} disabled={Object.keys(pendingAccounts).length <= 1}>
            Delete {pendingSelectedAccountName}
          </button>
          <button type="button" className="secondary success" onClick={handleAccountAdd}>
            Add new account
          </button>
        </div>
      </footer>
    </section>
  );
}
