import { useSettingsFunctions } from "./SettingsStoreFunctions";

export type Settings = {
  showAll: boolean;
  wrap: boolean;
  preferredTabs: {
    searchOrHistory: 'search' | 'history';
    results: 'combined' | 'artifacts' | 'characters';
  },
  updated: number;
}

export type SettingsStoreContextType = ReturnType<typeof useSettingsFunctions> & {
  settings: Settings;
}