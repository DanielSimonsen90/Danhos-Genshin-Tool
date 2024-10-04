import { useState, PropsWithChildren } from 'react';
import { DebugLog } from '@/common/functions/dev';
import { SettingsStoreContext } from './SettingsStoreConstants';
import { Settings } from './SettingsStoreTypes';
import { useLoadSettings, useSettingsFunctions } from './SettingsStoreFunctions';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

export default function SettingsStoreProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<Settings>({} as Settings);
  const store = useSettingsFunctions(settings, setSettings);

  useLoadSettings(setSettings);
  debugLog('SettingsStore updated', settings);

  return (
    <SettingsStoreContext.Provider value={{ ...store, settings }}>
      {children}
    </SettingsStoreContext.Provider>
  );
}