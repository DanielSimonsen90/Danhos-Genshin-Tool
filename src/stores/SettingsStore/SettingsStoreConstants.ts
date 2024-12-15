import { Settings } from "./SettingsStoreTypes";

export const LOCAL_STORAGE_KEY = 'settings';
export const DEFAULT_SETTINGS: Settings = {
  showAll: false,
  wrap: true,
  preferredTabs: {
    searchOrHistory: 'search',
    results: 'combined'
  },
  updated: undefined,
  newUser: true
};