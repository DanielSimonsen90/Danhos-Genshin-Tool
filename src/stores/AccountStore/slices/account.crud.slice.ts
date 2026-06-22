import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { AccountContextType, AccountData, DEFAULT_ACCOUNT_DATA, DEFAULT_ACCOUNT_NAME } from "..";
import accountsSlice from "./accounts.slice";
import { generateAccountId } from "../AccountStoreFunctions";

export default new StoreBuilder()
  .addSlice(accountsSlice)
  .addApi(({ get, api, set }) => {
    function addAccount(name: string, data?: Partial<AccountData>) {
      const { accounts } = get();
      if (accounts[name] && name !== DEFAULT_ACCOUNT_NAME) throw new Error(`Account ${name} already exists`);
      if (!name?.trim()) throw new Error('Account name cannot be empty');

      const nextData: AccountData = {
        ...DEFAULT_ACCOUNT_DATA,
        ...data,
        id: generateAccountId(),
      }

      const next = {
        ...accounts,
        [name]: nextData
      }

      set({ accounts: next });
    }
    function deleteAccount(name: string) {
      const { accounts } = get();
      if (!accounts[name]) throw new Error(`Account ${name} does not exist`);

      const accountKeys = Object.keys(accounts);
      if (accountKeys.length <= 1) throw new Error('Cannot delete last account')
      
      const currentWasDeleted = accounts[name]?.selected ?? false;
      const next = { ...accounts }
      delete next[name];

      if (currentWasDeleted) {
        const [fallbackAccountName, fallbackAccountData] = Object.entries(next).find(Boolean)!;
        next[fallbackAccountName as keyof AccountContextType] = {
          ...DEFAULT_ACCOUNT_DATA,
          ...fallbackAccountData,
          selected: true,
        }
      }

      set({ accounts: next });  
    }

    function replaceAccounts(next: AccountContextType, selectedName: string) {
      const entries = Object.entries(next).filter((entry): entry is [string, AccountData] => entry[1] != null);
      if (entries.length === 0) throw new Error('Cannot replace accounts with an empty map');

      const effectiveSelected = selectedName in next ? selectedName : entries[0][0];
      const withSelection = entries.reduce((acc, [name, data]) => {
        acc[name] = { ...data, selected: name === effectiveSelected };
        return acc;
      }, {} as AccountContextType);

      set({ accounts: withSelection });
    }

    return {
      addAccount,
      deleteAccount,
      replaceAccounts,
    }
  })