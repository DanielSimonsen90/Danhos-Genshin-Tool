import { resolveFunctionable } from "@/common/functions/object";
import { Functionable } from "@/common/types";
import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { AccountContextType, AccountData, DEFAULT_ACCOUNT_DATA } from "..";
import accountGetSlice from "./account.get.slice";
import accountsSlice from "./accounts.slice";

export default new StoreBuilder()
  .addSlice(accountsSlice)
  .addSlice(accountGetSlice)
  .addApi(({ get, set, api }) => {
    function setAccountData(update: Functionable<Partial<AccountContextType[string]>>) {
      const existing = api.selectedAccount;
      const resolvedUpdate = resolveFunctionable(update, [existing]);
      if (!resolvedUpdate) return;

      const validAccountDataKeys = Object.keys(DEFAULT_ACCOUNT_DATA);
      const invalidKeys = Object
        .keys(resolvedUpdate)
        .filter(key => !validAccountDataKeys.includes(key))
      
      if (invalidKeys.length) {
        api.debugLog('Filtering out invalid properties from account data update:', invalidKeys);
        api.debugLog('Original update:', resolvedUpdate);
      }

      const filteredUpdate = Object.keys(resolvedUpdate).reduce((acc, key) => {
        if (validAccountDataKeys.includes(key)) {
          (acc as any)[key] = (resolvedUpdate as any)[key]
        }

        return acc;
      }, {} as Partial<AccountData>)

      if (invalidKeys.length) {
        api.debugLog('Filtered update', filteredUpdate)
      }

      const targetAccountKey = Object
        .entries(get())
        .find(([_, data]) => data?.id === filteredUpdate.id)
        ?.[0]

      if (!targetAccountKey) {
        console.error(filteredUpdate)
        throw new Error(`Target account key could not be determined`)
      }

      const next = Object.entries(get()).reduce((acc, [_accountKey, data]) => {
        const accountKey = _accountKey as keyof AccountContextType;
        
        if (accountKey === targetAccountKey) {
          // TODO: Test prioritylist account switching
          // If bugged, un- and serialize existing data
          acc[accountKey] = {
            ...DEFAULT_ACCOUNT_DATA,
            ...data,
            ...filteredUpdate,
          }
        }

        return acc;
      }, {} as AccountContextType);

      set(next);
    }
    function setAccountName(name: string) {
      const accounts = get();
      if (accounts[name]) return;

      const currentAccountName = api.selectedAccountName;
      const data = api.selectedAccount;

      accounts[name] = data;
      delete accounts[currentAccountName];
      
      set(accounts);
    }
    function setSelectedAccount(accountName: string) {
      const accounts = get();
      const nextAccount = accounts[accountName];
      if (!nextAccount) throw new Error(`Unknown account name: ${accountName} - ${Object.keys(accounts).join(', ')}`);

      api.selectedAccount.selected = false;

      nextAccount.selected = true;
      set(accounts);
    }

    return {
      setAccountData,
      setAccountName,
      setSelectedAccount
    }
  })