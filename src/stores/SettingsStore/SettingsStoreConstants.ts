import { createContext } from "react";
import { Settings, SettingsStoreContextType } from "./SettingsStoreTypes";

export const LOCAL_STORAGE_KEY = 'settings';
export const DEFAULT_SETTINGS: Settings = {
  showAll: false,
  wrap: true,
  preferredTabs: {
    searchOrHistory: 'search',
    results: 'combined'
  },
  updated: undefined
};

export const SettingsStoreContext = createContext<SettingsStoreContextType>(null);