import loggerSlice from "@/stores/_baseStore/slices/logger.slice";
import memoSlice from "@/stores/_baseStore/slices/memo.slice";
import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { LOCAL_STORAGE_KEY } from "../AccountStoreConstants";
import { DEFAULT_ACCOUNT_DATA, DEFAULT_ACCOUNT_NAME } from "../AccountStoreConstants";
import { AccountContextType, AccountData } from "../AccountStoreTypes";

export default new StoreBuilder({
  accounts: {
    [DEFAULT_ACCOUNT_NAME]: DEFAULT_ACCOUNT_DATA
  } as AccountContextType
})
  .addPersistence({
    key: LOCAL_STORAGE_KEY,
    version: 1,
    stringify: (state) => JSON.stringify(state.accounts),
    parse: (raw) => ({ accounts: JSON.parse(raw) }),
  })
  .addSlice(loggerSlice('accountStore'))
  .addSlice(memoSlice({
    validAccountKeys: () => 'valid_account_keys',
    accounts: () => 'accounts',
  }))
  .addApi(({ get, api }) => {
    const validAccountDataKeys = api.memoize(
      keys => keys.validAccountKeys(),
      () => Object.keys(DEFAULT_ACCOUNT_DATA)
    );

    const getAccounts = () => api.memoize(
      keys => keys.accounts(),
      () => Object.keys(get().accounts).reduce((acc, accountKey) => {
        const account = get().accounts[accountKey];
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
      }, {} as AccountContextType),
      JSON.stringify(get().accounts)
    );

    return {
      get accounts() {
        return getAccounts();
      },
      validAccountDataKeys
    }
  })