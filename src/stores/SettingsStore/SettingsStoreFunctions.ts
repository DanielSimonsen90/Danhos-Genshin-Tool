import { Dispatch, SetStateAction } from "react";
import { AppSettings } from "./SettingsStoreTypes";
import { DEFAULT_SETTINGS, LOCAL_STORAGE_KEY } from "./SettingsStoreConstants";
import { DebugLog } from "@/common/functions/dev";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

export function useSettingsFunctions(settings: AppSettings, setSettings: Dispatch<SetStateAction<AppSettings>>, setInitialSettings: Dispatch<SetStateAction<AppSettings>>) {
  const getSetting = <Key extends keyof AppSettings>(key: Key): AppSettings[Key] | undefined => settings[key];
  const updateSettings = (update: SetStateAction<Partial<AppSettings>>) => setSettings(settings => {
    const resolvedUpdate = typeof update === 'function' ? update(settings) : update;
    debugLog('Settings update', resolvedUpdate);
    return { ...(resolvedUpdate as AppSettings), updated: Date.now() };
  })
  const saveSettings = (update?: SetStateAction<Partial<AppSettings>>) => {
    const resolvedSettings = update 
      ? (typeof update === 'function' 
        ? update(settings) 
        : update
    ) : settings;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resolvedSettings));
    debugLog('Settings saved', resolvedSettings);

    const newInitialSettings = { ...resolvedSettings };
    delete newInitialSettings.updated;
    setInitialSettings(newInitialSettings as AppSettings);
  };
  const updateAndSaveSettings = (update: SetStateAction<Partial<AppSettings>>) => {
    const resolvedUpdate = typeof update === 'function' ? update(settings) : update;
    updateSettings(resolvedUpdate);
    saveSettings(resolvedUpdate);
  };
  const resetSettings = () => updateAndSaveSettings(DEFAULT_SETTINGS);

  return { getSetting, updateSettings, saveSettings, updateAndSaveSettings, resetSettings };
}