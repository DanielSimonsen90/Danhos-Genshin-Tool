import { useState, useMemo, useEffect, useCallback } from 'react';
import { DebugLog } from '@/common/functions/dev';
import { DEFAULT_SETTINGS } from './SettingsStoreConstants';
import { Settings } from './SettingsStoreTypes';
import { useSettingsFunctions } from './SettingsStoreFunctions';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SaveSettingsNotice } from './components';

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

  const didSettingsChange = useMemo(() => {
    const settingsClone = { ...settings };
    delete settingsClone.updated;
    return JSON.stringify(settingsClone) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);
  const SettingsNotice = useCallback(() =>
    <SaveSettingsNotice
      onSave={() => {
        store.save();
        setInitialSettings(settings);
      }}
      onDiscard={() => setSettings(initialSettings)}
      onClose={() => setHideNotice(true)}
    />, []);
  const store = useSettingsFunctions(settings, setSettings);

  debugLog('SettingsStore updated', settings);

  useEffect(() => {
    if (didSettingsChange) localStorage.set(settings);
  }, [didSettingsChange]);

  return [store, {
    didSettingsChange,
    hideNotice,
    SettingsNotice,
  }] as const;
}