import { useState, useMemo, useCallback } from 'react';

import { DebugLog } from '@/common/functions/dev';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { DEFAULT_SETTINGS, LOCAL_STORAGE_KEY } from './SettingsStoreConstants';
import { AppSettings } from './SettingsStoreTypes';
import { useSettingsFunctions } from './SettingsStoreFunctions';
import { SaveSettingsNotice, NewUserModal } from './components';
import useRegionStoreProvider from '../RegionStore';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

export default function useSettingsStoreProvider() {
  const localStorage = useLocalStorage<AppSettings>(LOCAL_STORAGE_KEY);
  const [initialSettings, setInitialSettings] = useState(() => {
    const initial = localStorage.get() ?? DEFAULT_SETTINGS;
    delete initial.updated;
    return initial;
  });
  const [settings, setSettings] = useState(initialSettings);
  const [hideNotice, setHideNotice] = useState(false);
  const [regionStore] = useRegionStoreProvider()

  const hasCustomSettings = useMemo(() => JSON.stringify(settings) !== JSON.stringify(DEFAULT_SETTINGS), [settings]);
  const hasUnsavedChanges = useMemo(() => {
    const settingsClone = { ...settings };
    const initialSettingsClone = { ...initialSettings };
    
    // Delete unimportant properties
    delete settingsClone.updated;
    delete settingsClone.newUser;

    delete initialSettingsClone.updated;
    delete initialSettingsClone.newUser;

    const result = JSON.stringify(settingsClone) !== JSON.stringify(initialSettingsClone);
    if (result) debugLog('SettingsStore has unsaved changes', { 
      current: settingsClone, 
      initial: initialSettingsClone 
    });
    return result;
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
    <NewUserModal newUser={settings.newUser} onSubmit={data => {
      debugLog('NewUserModal submitted', data)
      store.updateAndSaveSettings(state => {
        const update = { ...state };
        delete update.newUser;
        return update;
      })
      regionStore.setRegionData({
        ...data,
        selected: true,
      });
    }} />
  ), [settings.newUser]);

  debugLog('SettingsStore updated', settings);

  return [{ ...store, settings, hasCustomSettings, hasUnsavedChanges }, { SettingsNotice, NewUser }] as const;
}