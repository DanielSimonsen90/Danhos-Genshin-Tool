import { useState, useMemo, useEffect, useCallback } from 'react';

import { DebugLog } from '@/common/functions/dev';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { DEFAULT_SETTINGS } from './SettingsStoreConstants';
import { Settings } from './SettingsStoreTypes';
import { useSettingsFunctions } from './SettingsStoreFunctions';
import { SaveSettingsNotice, NewUserModal } from './components';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

export default function useSettingsStoreProvider() {
  const localStorage = useLocalStorage<Settings>('settings');
  const [initialSettings, setInitialSettings] = useState(() => {
    const initial = localStorage.get() ?? DEFAULT_SETTINGS;
    delete initial.updated;
    return initial;
  });
  const [settings, setSettings] = useState(initialSettings);
  const [hideNotice, setHideNotice] = useState(false);

  const newUser = settings.traveler === undefined;
  const didSettingsChange = useMemo(() => {
    const settingsClone = { ...settings };
    delete settingsClone.updated;
    return JSON.stringify(settingsClone) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);
  const store = useSettingsFunctions(settings, setSettings);

  const SettingsNotice = useCallback(() =>
    <SaveSettingsNotice showNotice={!hideNotice && didSettingsChange}
      onSave={() => {
        if (!didSettingsChange) return console.log('No changes to save');
        store.save();
        const newInitialSettings = { ...settings };
        delete newInitialSettings.updated;
        setInitialSettings(newInitialSettings);
      }}
      onDiscard={() => setSettings(initialSettings)}
      onClose={() => setHideNotice(true)}
    />, [didSettingsChange, hideNotice, initialSettings, settings]);
  const NewUser = useCallback(() => (
    <NewUserModal newUser={newUser} onTravelerSelect={traveler => store.update({ traveler })} />
  ), [newUser]);

  debugLog('SettingsStore updated', settings);

  useEffect(() => {
    if (initialSettings.traveler === undefined && settings.traveler !== undefined) {
      store.save();
    }
  }, [didSettingsChange]);

  return [store, { SettingsNotice, NewUser }] as const;
}