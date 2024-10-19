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
  const hasCustomSettings = useMemo(() => JSON.stringify(settings) !== JSON.stringify(DEFAULT_SETTINGS), [settings]);
  const hasUnsavedChanges = useMemo(() => {
    const settingsClone = { ...settings };
    delete settingsClone.updated;
    return JSON.stringify(settingsClone) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);
  const store = useSettingsFunctions(settings, setSettings, setInitialSettings);

  const SettingsNotice = useCallback(() =>
    <SaveSettingsNotice showNotice={!hideNotice && hasUnsavedChanges}
      onSave={() => {
        if (!hasUnsavedChanges) return console.log('No changes to save');
        store.saveSettings();
      }}
      onDiscard={() => setSettings(initialSettings)}
      onClose={() => setHideNotice(true)}
    />, [hasUnsavedChanges, hideNotice, initialSettings, settings]);
  const NewUser = useCallback(() => (
    <NewUserModal newUser={newUser} onTravelerSelect={traveler => store.updateAndSaveSettings({ traveler })} />
  ), [newUser]);

  debugLog('SettingsStore updated', settings);

  useEffect(() => {
    if (initialSettings.traveler === undefined && settings.traveler !== undefined) {
      store.saveSettings();
    }
  }, [hasUnsavedChanges]);

  return [{ ...store, settings, hasCustomSettings, hasUnsavedChanges }, { SettingsNotice, NewUser }] as const;
}