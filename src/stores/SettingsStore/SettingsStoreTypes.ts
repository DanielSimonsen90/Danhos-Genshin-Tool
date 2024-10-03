import { BaseEventsMap } from "../BaseStore";
import type { SettingsStore } from "./SettingsStore";

export type Settings = {
  showAll: boolean;
  wrap: boolean;
  preferredTabs: {
    searchOrHistory: 'search' | 'history';
    results: 'combined' | 'artifacts' | 'characters';
  }
}

export type SettingsEvents = BaseEventsMap & {
  change: [keyof Settings, Settings[keyof Settings]];
  reset: [];
}

export type SettingsStoreContextType = SettingsStore;