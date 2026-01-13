import { create } from 'zustand';

import * as ObjectUtils from '@/common/functions/object';
import { DebugLog } from "@/common/functions/dev";
import StorageService from '@/services/StorageService';

import { AccountData, WorldRegion, Traveler, AccountContextType, AccountStore, AccountSettings, FavoriteModels, FavoritesCollection, FavoritesSlice, FavoriteModel } from './AccountStoreTypes';
import { DEFAULT_WORLD_REGION, DEFAULT_ACCOUNT_DATA, LOCAL_STORAGE_KEY__LEGACY, DEFAULT_FAVORITES, DEFAULT_ACCOUNT_NAME, LOCAL_STORAGE_KEY } from './AccountStoreConstants';
import { Model } from '@/common/models/Model';

export const useAccountStore = create<AccountStore>((setState, getState) => {
  const legacyStorageService = StorageService<AccountContextType>(LOCAL_STORAGE_KEY__LEGACY);
  const storageService = StorageService<AccountContextType>(LOCAL_STORAGE_KEY);

  if (!storageService.get() && legacyStorageService.get()) {
    // Migrate legacy data
    const stored = legacyStorageService.get()!;
    const update = Object.keys(stored).reduce((acc, key) => {
      const region = stored[key as any];
      if (!region) return acc;

      acc[key] = {
        ...ObjectUtils.exclude(region, 'region' as any),
        worldRegion: key as WorldRegion,
      } as any;

      return acc;
    }, {} as AccountContextType);
    storageService.set(update);
    legacyStorageService.remove();
  }

  const debugLog = DebugLog(DebugLog.DEBUGS.accountStore);

  // Get and filter accounts data to remove any invalid properties
  const context = storageService.get() ?? { [DEFAULT_ACCOUNT_NAME]: DEFAULT_ACCOUNT_DATA } as AccountContextType;

  // Define valid AccountData properties
  const validAccountDataKeys = Object.keys(DEFAULT_ACCOUNT_DATA);
  const accounts = Object.keys(context).reduce((acc, accountKey) => {
    const accountData = context[accountKey as keyof AccountContextType];

    if (accountData) {
      const invalidKeys = Object.keys(accountData).filter(key => !validAccountDataKeys.includes(key));
      if (invalidKeys.length > 0) debugLog(`Filtering out invalid properties from account ${accountKey}:`, invalidKeys);

      acc[accountKey as keyof AccountContextType] = Object.keys(accountData).reduce((dataAcc, key) => {
        if (validAccountDataKeys.includes(key)) (dataAcc as any)[key] = (accountData as any)[key];
        return dataAcc;
      }, {} as AccountData);
    }

    return acc;
  }, {} as AccountContextType);
  const getSelectedAccountName = (accounts: AccountContextType) => Object.keys(accounts).find(account => accounts[account as keyof typeof accounts]?.selected) ?? Object.keys(accounts).find(Boolean) as keyof AccountContextType;
  const getAccountData = (accounts: AccountContextType) => {
    const currentAccount = getSelectedAccountName(accounts);
    const accountData = currentAccount ? accounts[currentAccount as keyof typeof accounts] : undefined;
    if (!accountData) throw new Error(`No account data found for current account: ${currentAccount}`);

    // Ensure favorites are always initialized
    const dataWithFavorites = {
      ...accountData,
      favorites: accountData.favorites ?? DEFAULT_FAVORITES,
    };

    return Object.assign({}, dataWithFavorites, { setAccountData });
  };
  const setAccountData = (update: Partial<AccountData> | ((state: AccountData) => AccountData)) => {
    const { accounts, worldRegion } = getState();
    const resolvedAccountDataUpate = typeof update === 'function'
      ? update(getState().accountData)
      : update;
    resolvedAccountDataUpate.worldRegion ??= worldRegion;
    const validAccountDataKey = Object.keys(DEFAULT_ACCOUNT_DATA);
    const invalidKeys = Object.keys(resolvedAccountDataUpate).filter(key => !validAccountDataKey.includes(key));
    if (invalidKeys.length > 0) {
      debugLog('Filtering out invalid properties from account data update:', invalidKeys);
      debugLog('Original update:', resolvedAccountDataUpate);
    }

    const filteredUpdate = Object.keys(resolvedAccountDataUpate).reduce((acc, key) => {
      if (validAccountDataKey.includes(key)) {
        (acc as any)[key] = (resolvedAccountDataUpate as any)[key];
      }
      return acc;
    }, {} as Partial<AccountData>);

    if (invalidKeys.length > 0) {
      debugLog('Filtered update:', filteredUpdate);
    }

    // Define the next selected accountData
    const next = Object.keys(accounts).reduce((acc, _accountKey) => {
      const accountKey = _accountKey as keyof AccountContextType;
      const storedData: AccountData = accounts[accountKey] ?? Object.assign(
        ObjectUtils.exclude(DEFAULT_ACCOUNT_DATA, 'selected'),
        { selected: false, favorites: DEFAULT_FAVORITES } as AccountData,
      );

      if (accountKey === filteredUpdate.worldRegion) acc[accountKey] = {
        ...storedData,
        ...filteredUpdate,
        selected: true,
      };
      else if (storedData.selected && filteredUpdate.worldRegion) acc[accountKey] = { ...storedData, selected: false };
      else if (accounts[accountKey]) acc[accountKey] = storedData;

      return acc;
    }, {} as AccountContextType);

    // If no region is selected, create the default region
    if (Object.keys(next).length === 0) next[DEFAULT_WORLD_REGION] = {
      ...DEFAULT_ACCOUNT_DATA,
      ...filteredUpdate,
      selected: true,
    };

    storageService.set(next);

    setState({
      accounts: next,
      worldRegion: next[getSelectedAccountName(next)]?.worldRegion ?? DEFAULT_WORLD_REGION,
      accountData: getAccountData(next),
    });
  };

  const setAccountName = (name: string) => {
    const { accounts } = getState();
    if (accounts[name]) return; // Account name already exists

    const currentAccountName = getSelectedAccountName(accounts);
    if (!currentAccountName) throw new Error('No current account selected');

    const data = getAccountData(accounts);
    accounts[name] = { ...data };
    delete accounts[currentAccountName];

    setState({ accounts });
  }
  const setWorldRegion = (worldRegion: WorldRegion) => setAccountData({ worldRegion });
  const setTraveler = (traveler: Traveler) => setAccountData({ traveler });
  const setSelectedAccount = (accountName: string) => {
    const { accounts } = getState();
    if (!accounts[accountName]) throw new Error(`Account ${accountName} does not exist`);

    const updatedAccounts = Object.keys(accounts).reduce((acc, key) => {
      const accountKey = key as keyof AccountContextType;
      acc[accountKey] = {
        ...accounts[accountKey],
        selected: accountKey === accountName,
      } as AccountData;
      return acc;
    }, {} as AccountContextType);

    setState({
      accounts: updatedAccounts,
      worldRegion: updatedAccounts[accountName]?.worldRegion ?? DEFAULT_WORLD_REGION,
      selectedAccountName: accountName,
      accountData: getAccountData(updatedAccounts),
    });
  }

  const getGenshinServerDay = (region: WorldRegion): number => {
    const now = new Date();

    // Genshin Impact daily reset happens at 4am server time
    const GENSHIN_RESET_HOUR = 4;

    // Define server timezone offsets (hours from GMT)
    // TW, HK, MO timezone is unknown, so it's excluded and falls back to user's local time
    const serverTimezoneOffsets: Record<WorldRegion, number> = {
      'Asia': 8,           // GMT+8
      'Europe': 1,         // GMT+1
      'North America': -5,  // GMT-5
      'TW, HK, MO': 8      // GMT+8 (assumed, but not confirmed)
    };

    const timezoneOffset = serverTimezoneOffsets[region];

    // If unknown region, return user's current day
    if (timezoneOffset === undefined) return now.getDay();

    // Calculate server time
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const serverTime = new Date(utc + (timezoneOffset * 60 * 60 * 1000));

    // If it's before 4am server time, consider it the previous day
    if (serverTime.getHours() < GENSHIN_RESET_HOUR) {
      const previousDay = new Date(serverTime);
      previousDay.setDate(previousDay.getDate() - 1);
      return previousDay.getDay();
    }

    return serverTime.getDay();
  };
  const getGenshinServerDayName = (region: WorldRegion): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = getGenshinServerDay(region);
    return days[dayIndex] || 'Unknown';
  };

  const favorites: FavoritesSlice = {
    getAllFavorites: (): FavoritesCollection => getState().accountData.favorites ?? DEFAULT_FAVORITES,

    hasAnyFavorites: (): boolean => {
      const favorites = getState().accountData.favorites ?? DEFAULT_FAVORITES;
      return Object.values(favorites).some(favList => favList.length > 0);
    },

    clearFavorites: () => setAccountData({ favorites: DEFAULT_FAVORITES }),

    getFavorite: <TFavoriteModel extends keyof FavoriteModels>(type: TFavoriteModel): FavoriteModel<TFavoriteModel> => ({
      add: (item: FavoriteModels[TFavoriteModel]) => {
        const currentFavorites = getState().accountData.favorites ?? DEFAULT_FAVORITES;
        const favorites = {
          ...currentFavorites,
          [type]: [...(currentFavorites[type] || []), item]
        };
        setAccountData({ favorites });
      },

      remove: (item: FavoriteModels[TFavoriteModel]) => {
        const currentFavorites = getState().accountData.favorites ?? DEFAULT_FAVORITES;
        const favorites = {
          ...currentFavorites,
          [type]: (currentFavorites[type] as Model[]).filter((model: Model) => model.name !== item.name)
        };
        setAccountData({ favorites });
      },

      isFavorite: (item: FavoriteModels[TFavoriteModel] | string) => {
        const currentFavorites = getState().accountData.favorites ?? DEFAULT_FAVORITES;
        return currentFavorites[type]?.some((model: Model) => model.name === (typeof item === 'string' ? item : item.name)) ?? false;
      },

      getFavorites: (): Array<FavoriteModels[TFavoriteModel]> => {
        const currentFavorites = getState().accountData.favorites ?? DEFAULT_FAVORITES;
        return (currentFavorites[type] ?? []) as Array<FavoriteModels[TFavoriteModel]>;
      }
    })
  };

  return {
    accounts,
    selectedAccountName: getSelectedAccountName(accounts) ?? DEFAULT_ACCOUNT_NAME,
    worldRegion: accounts[getSelectedAccountName(accounts)]?.worldRegion ?? DEFAULT_WORLD_REGION,
    accountData: getAccountData(accounts),
    get regionSettings(): AccountSettings {
      const accountName = getSelectedAccountName(getState().accounts);
      const accountData = ObjectUtils.pick(getState().accountData, 'worldRegion', 'traveler');

      return {
        ...accountData,
        // Select of all accounts
        selectedAccount: accountName ?? '',
        // Ability to modify account name
        selectedAccountName: accountName ?? '',
        accountCrud: true
      };
    },

    setAccountName,
    setAccountData,
    setWorldRegion,
    setTraveler,
    setSelectedAccount,
    setState,

    getGenshinServerDay,
    getGenshinServerDayName,

    favorites,

    storageService,
  } as AccountStore;
});

export default useAccountStore;