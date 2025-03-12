import { SetStateAction } from "react";

export type AppSettings = {
  showAll: boolean;
  wrap: boolean;
  preferredTabs: {
    searchOrHistory: 'search' | 'history';
    results: 'combined' | 'artifacts' | 'characters';
  },

  updated?: number;
  newUser?: boolean;
}
export type ChangeableSettings = Exclude<AppSettings, 'updated' | 'newUser'>;

export type SettingsStore = {
  settings: AppSettings;
  initialSettings: AppSettings;

  hideNotice: boolean;
  setHideNotice: (hide: boolean) => void;

  get hasCustomSettings(): boolean;
  get hasUnsavedChanges(): boolean;
  get changeableSettings(): ChangeableSettings;

  getSetting<Key extends keyof AppSettings>(key: Key): AppSettings[Key] | undefined;
  updateSettings(update: SetStateAction<Partial<AppSettings>>): void;
  updateSettings(update: SetStateAction<AppSettings>, override: true): void;
  saveSettings(update?: SetStateAction<Partial<AppSettings>>): void;
  updateAndSaveSettings(update: SetStateAction<Partial<AppSettings>>): void;
  updateAndSaveSettings(update: SetStateAction<AppSettings>, override: true): void;
  resetSettings(): void;
}