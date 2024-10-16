import { useSettingsFunctions } from "./SettingsStoreFunctions";

export type Settings = {
  showAll: boolean;
  wrap: boolean;
  preferredTabs: {
    searchOrHistory: 'search' | 'history';
    results: 'combined' | 'artifacts' | 'characters';
  },
  traveler: 'lumine' | 'aether' | undefined;
  updated: number;
}

export type SettingsStoreContextType = ReturnType<typeof useSettingsFunctions> & {
  settings: Settings;
}