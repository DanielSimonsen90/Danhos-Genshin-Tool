import { LOCAL_STORAGE_KEY } from "@/stores/SettingsStore/SettingsStoreConstants";
import loggerSlice from "@/stores/_baseStore/slices/logger.slice";
import memoSlice from "@/stores/_baseStore/slices/memo.slice";
import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { DEFAULT_ACCOUNT_DATA, DEFAULT_ACCOUNT_NAME } from "../AccountStoreConstants";
import { AccountContextType, AccountData } from "../AccountStoreTypes";

export default new StoreBuilder({
  [DEFAULT_ACCOUNT_NAME]: DEFAULT_ACCOUNT_DATA
} as AccountContextType)
  .addPersistence({
    key: LOCAL_STORAGE_KEY,
    version: 1,
  })
  .addSlice(loggerSlice('accountStore'))
  .addSlice(memoSlice({
    validAccountKeys: () => 'valid_account_keys',
    accounts: () => 'accounts',
  }))
  .addApi(({ get, set, api }) => {
    const validAccountDataKeys = api.memoize(
      keys => keys.validAccountKeys(),
      () => Object.keys(DEFAULT_ACCOUNT_DATA)
    );
    const accounts = api.memoize(
      keys => keys.accounts(),
      () => Object.keys(get()).reduce((acc, accountKey) => {
        const account = get()[accountKey];
        if (!account) {
          console.warn(`Account with key "${accountKey}" has no data and will be skipped.`);
          return acc;
        }

        const invalidKeys = Object
          .keys(account)
          .filter(key => !validAccountDataKeys.includes(key));
        
        if (invalidKeys.length) api.debugLog(`Filtering out invalid properties from account ${accountKey}`, invalidKeys);

        const filteredData = Object.keys(account).reduce((acc, key) => {
          if (validAccountDataKeys.includes(key)) (acc as any)[key] = account[key as keyof AccountData];
          return acc;
        }, {} as AccountData)

        acc[accountKey as keyof AccountContextType] = filteredData;
        return acc;
      }, {} as AccountContextType)
    );

    return {
      accounts,
      validAccountDataKeys
    }
  })