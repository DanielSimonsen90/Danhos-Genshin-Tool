import { AppSettings } from "./SettingsStoreTypes";

export const LOCAL_STORAGE_KEY = 'settings';
export const DEFAULT_SETTINGS: AppSettings = {
  showAll: false,
  wrap: true,
  preferredTabs: {
    searchOrHistory: 'search',
    results: 'combined'
  },
  updated: undefined,
  newUser: true
};