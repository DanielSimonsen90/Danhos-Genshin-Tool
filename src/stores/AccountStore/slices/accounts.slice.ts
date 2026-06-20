import loggerSlice from "@/stores/_baseStore/slices/logger.slice";
import memoSlice from "@/stores/_baseStore/slices/memo.slice";
import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { DEFAULT_ACCOUNT_DATA, DEFAULT_ACCOUNT_NAME, LOCAL_STORAGE_KEY } from "../AccountStoreConstants";
import { AccountContextType, AccountData } from "../AccountStoreTypes";

export default new StoreBuilder({
  accounts: {
    [DEFAULT_ACCOUNT_NAME]: DEFAULT_ACCOUNT_DATA
  } as AccountContextType
})
  .addPersistence({
    key: LOCAL_STORAGE_KEY,
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

    const getAccounts = () => {
      // Simple memoization - return cached if accounts reference hasn't changed
      const rawAccounts = get().accounts;
      return api.memoize(
        keys => keys.accounts(),
        () => rawAccounts,
        rawAccounts  // Use object reference as dependency instead of stringified version
      );
    };

    return {
      get accounts() {
        return getAccounts();
      },
      validAccountDataKeys
    }
  })