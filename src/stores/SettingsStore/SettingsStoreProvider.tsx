import { useState, PropsWithChildren, useMemo } from 'react';
import { DebugLog } from '@/common/functions/dev';
import { SettingsStoreContext, DEFAULT_SETTINGS } from './SettingsStoreConstants';
import { Settings } from './SettingsStoreTypes';
import { useSettingsFunctions } from './SettingsStoreFunctions';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

export default function SettingsStoreProvider({ children }: PropsWithChildren) {
  const localStorage = useLocalStorage('settings');
  const [settings, setSettings] = useState(() => localStorage.get<Settings>() ?? DEFAULT_SETTINGS);
  const didSettingsChange = useMemo(() => {
    const settingsClone = { ...settings };
    delete settingsClone.updated;
    JSON.stringify(settingsClone) !== JSON.stringify(DEFAULT_SETTINGS)
  }, [settings]);
  const store = useSettingsFunctions(settings, setSettings);

  debugLog('SettingsStore updated', settings);

  return (
    <SettingsStoreContext.Provider value={{ ...store, settings }}>
      {children}
    </SettingsStoreContext.Provider>
  );
}