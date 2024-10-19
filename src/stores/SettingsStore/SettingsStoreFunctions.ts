import { Dispatch, SetStateAction } from "react";
import { Settings } from "./SettingsStoreTypes";
import { DEFAULT_SETTINGS, LOCAL_STORAGE_KEY } from "./SettingsStoreConstants";
import { DebugLog } from "@/common/functions/dev";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

export function useSettingsFunctions(settings: Settings, setSettings: Dispatch<SetStateAction<Settings>>, setInitialSettings: Dispatch<SetStateAction<Settings>>) {
  const getSetting = <Key extends keyof Settings>(key: Key): Settings[Key] | undefined => settings[key];
  const updateSettings = (update: SetStateAction<Partial<Settings>>) => {
    debugLog('Settings update', update);
    setSettings(settings => ({
      ...settings,
      ...typeof update === 'function' ? update(settings) : update,
      updated: Date.now(),
    }));
  };
  const saveSettings = (settings?: Settings) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    debugLog('Settings saved', settings);

    const newInitialSettings = { ...settings };
    delete newInitialSettings.updated;
    setInitialSettings(newInitialSettings);
  };
  const updateAndSaveSettings = (update: SetStateAction<Partial<Settings>>) => {
    updateSettings(update);
    saveSettings({ ...settings, ...update });
  };
  const resetSettings = () => updateAndSaveSettings(DEFAULT_SETTINGS);

  return { getSetting, updateSettings, saveSettings, updateAndSaveSettings, resetSettings };
}