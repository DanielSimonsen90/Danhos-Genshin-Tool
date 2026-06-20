import { Select } from "@/components/common/FormItems";
import SettingsOption from "../SettingsOption";
import { DEFAULT_ACCOUNT_DATA, Traveler, useAccountStore, WORLD_REGIONS } from "@/stores/AccountStore";
import { CharacterImage } from "@/components/common/media/Images";
import { useCallback, useMemo } from "react";
import { useStateReset } from "@/hooks/useStateReset";

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

export default function AccountSettings() {
  // Subscribe to individual values separately to get stable references
  const { 
    accounts, selectedAccountName,
    setSelectedAccount, setTraveler, setWorldRegion,
    setAccountName: renameAccount,
    addAccount, deleteAccount,
  } = useAccountStore();
  const { 
    traveler, 
    worldRegion
  } = useAccountStore(state => state.selectedAccount);

  const accountNames = useMemo(() => Object.keys(accounts), [accounts]);
  const [accountName, setAccountName, resetAccountName] = useStateReset(selectedAccountName);

  const handleAccountChange = useCallback((newAccountName: string) => {
    setSelectedAccount(newAccountName);
    resetAccountName(newAccountName);
  }, [setSelectedAccount, resetAccountName]);

  const handleAccountNameChange = useCallback((newName: string) => {
    if (newName?.trim() && newName !== selectedAccountName) {
      try {
        renameAccount(newName);
        resetAccountName(newName);
      } catch (error) {
        console.error('Failed to update account name:', error);
        resetAccountName(selectedAccountName || '');
      }
    }
  }, [renameAccount, selectedAccountName, resetAccountName]);

  const handleAccountAdd = useCallback(() => {
    const existingAccountNames = Object.keys(accounts);
    let counter = existingAccountNames.length + 1;
    let newAccountName = `Account ${counter}`;
    
    // Ensure the name is unique
    while (existingAccountNames.includes(newAccountName)) {
      counter++;
      newAccountName = `Account ${counter}`;
    }
    
    addAccount(newAccountName);
    setSelectedAccount(newAccountName);
    setAccountName(newAccountName);
  }, [accounts, addAccount, setSelectedAccount, setAccountName]);

  const handleAccountDelete = useCallback(() => {
    if (!selectedAccountName) return;
    
    deleteAccount(selectedAccountName);
  }, [selectedAccountName, deleteAccount]);

  return (
    <section className="account-settings">
      <header>
        <SettingsOption setting="selectedAccount"
          accountNames={accountNames}
          value={selectedAccountName}
          setValue={handleAccountChange}
        />
      </header>
      <div className="sub-header">
        <div className="input-group setting-traveler">
          <CharacterImage character={traveler ?? DEFAULT_ACCOUNT_DATA.traveler!} />
          <Select name="traveler"
            options={TRAVELER_OPTIONS}
            displayValue={displayTravelerValue}
            value={traveler}
            onChange={setTraveler}
          />
        </div>
        <div className="input-group setting-selectedAccountName">
          <label>Account Name</label>
          <input type="text"
            name="selectedAccountName"
            value={accountName}
            onChange={e => setAccountName(e.target.value)}
            onBlur={e => handleAccountNameChange(e.target.value.trim())}
          />
        </div>
      </div>
      <div className="input-group setting-worldRegion">
        <label>World Region</label>
        <Select name="worldRegion"
          options={WORLD_REGIONS}
          displayValue={displayWorldRegion}
          value={worldRegion}
          onChange={setWorldRegion}
        />
      </div>
      <footer>
        <SettingsOption setting="accountCrud"
          value={true}
          onAdd={handleAccountAdd}
          onDelete={handleAccountDelete}
        />
      </footer>
    </section>
  );
}