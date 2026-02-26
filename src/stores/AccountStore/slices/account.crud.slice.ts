import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { AccountContextType, AccountData, DEFAULT_ACCOUNT_DATA } from "..";
import accountsSlice from "./accounts.slice";

export default new StoreBuilder()
  .addSlice(accountsSlice)
  .addApi(({ get, set }) => {
    function addAccount(name: string) {
      const accounts = get();
      if (accounts[name]) throw new Error(`Account ${name} already exists`);
      if (!name?.trim()) throw new Error('Account name cannot be empty');

      const data: AccountData = {
        ...DEFAULT_ACCOUNT_DATA,
        selected: false,
      }

      const next = {
        ...accounts,
        [name]: data
      }

      set(next);
    }
    function deleteAccount(name: string) {
      const accounts = get();
      if (!accounts[name]) throw new Error(`Account ${name} already exists`);

      const accountKeys = Object.keys(accounts);
      if (accountKeys.length <= 1) throw new Error('Cannot delete last account')
      
      const currentWasDeleted = accounts[name]?.selected ?? false;
      const next = { ...accounts }
      delete next[name];

      if (currentWasDeleted) {
        const [fallbackAccountName, fallbackAccountData] = Object.entries(accounts).find(Boolean)!;
        next[fallbackAccountName as keyof AccountContextType] = {
          ...DEFAULT_ACCOUNT_DATA,
          ...fallbackAccountData,
          selected: true,
        }
      }

      set(next);
    }

    return {
      addAccount,
      deleteAccount
    }
  })