import { Select } from "@/components/common/FormItems";
import SettingsOption from "../SettingsOption";
import { DEFAULT_ACCOUNT_DATA, Traveler, useAccountStore, WORLD_REGIONS } from "@/stores/AccountStore";
import { CharacterImage } from "@/components/common/media/Images";
import { DEFAULT_SETTINGS } from "@/stores/SettingsStore/SettingsStoreConstants";
import { useCallback, useMemo, memo } from "react";
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

function AccountSettings() {
  // Subscribe to individual values separately to get stable references
  const accounts = useAccountStore(state => state.accounts);
  const selectedAccount = useAccountStore(state => state.selectedAccountName);
  const traveler = useAccountStore(state => state.accountData.traveler);
  const worldRegion = useAccountStore(state => state.accountData.worldRegion);
  const setSelectedAccount = useAccountStore(state => state.setSelectedAccount);
  const setTraveler = useAccountStore(state => state.setTraveler);
  
  // Memoize accountNames so it only changes when accounts actually change
  const accountNames = useMemo(() => Object.keys(accounts), [accounts]);
  
  const [accountName, setAccountName, resetAccountName] = useStateReset(selectedAccount || '');

  // Memoize callbacks to prevent child re-renders
  const handleAccountChange = useCallback((newAccountName: string) => {
    setSelectedAccount(newAccountName);
    resetAccountName(newAccountName);
  }, [setSelectedAccount, resetAccountName]);

  return (
    <section className="account-settings">
      <header>
        <div className="input-group">
          <label>Selected Account</label>
          <Select
            name="selectedAccountName"
            options={accountNames}
            value={selectedAccount}
            onChange={handleAccountChange}
          />
        </div>
      </header>
      <div className="sub-header">
        <div className="input-group">
          <CharacterImage character={traveler ?? DEFAULT_ACCOUNT_DATA.traveler!} />
          <Select name="traveler"
            options={TRAVELER_OPTIONS}
            displayValue={displayTravelerValue}
            value={traveler}
            onChange={setTraveler}
          />
        </div>
        <div className="input-group">
          <label>Account Name</label>
          <input type="text"
            name="selectedAccountName"
            value={accountName}
            onChange={e => setAccountName(e.target.value)}
          />
        </div>
      </div>
      <div className="world-region input-group">
        <label>World Region</label>
        <Select name="worldRegion"
          options={WORLD_REGIONS}
          displayValue={displayWorldRegion}
          defaultValue={worldRegion}
        />
      </div>
    </section>
  );
}

export default memo(AccountSettings);