import { useState, PropsWithChildren, useMemo, useEffect } from 'react';
import { DebugLog } from '@/common/functions/dev';
import { SettingsStoreContext, DEFAULT_SETTINGS } from './SettingsStoreConstants';
import { Settings } from './SettingsStoreTypes';
import { useSettingsFunctions } from './SettingsStoreFunctions';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

export default function SettingsStoreProvider({ children }: PropsWithChildren) {
  const localStorage = useLocalStorage<Settings>('settings');
  const [initialSettings, setInitialSettings] = useState(() => {
    const initial = localStorage.get() ?? DEFAULT_SETTINGS;
    delete initial.updated;
    return initial;
  });
  const [settings, setSettings] = useState(initialSettings);
  const didSettingsChange = useMemo(() => {
    const settingsClone = { ...settings };
    delete settingsClone.updated;
    return JSON.stringify(settingsClone) !== JSON.stringify(initialSettings)
  }, [settings, initialSettings]);
  const store = useSettingsFunctions(settings, setSettings);

  debugLog('SettingsStore updated', settings);

  useEffect(() => {
    if (didSettingsChange) localStorage.set(settings);
  }, [didSettingsChange])

  return (
    <SettingsStoreContext.Provider value={{ ...store, settings }}>
      <div style={{ display: 'flex' }}>
        {didSettingsChange && <button 
          onClick={() => {
            store.save();
            setInitialSettings(settings);
          }}
          onContextMenu={() => console.log(initialSettings, settings)}
        >Save</button>}
      </div>
      {children}
    </SettingsStoreContext.Provider>
  );
}