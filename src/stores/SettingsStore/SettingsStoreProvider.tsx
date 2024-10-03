import { useState, PropsWithChildren } from 'react';
import { SettingsStoreContext } from './SettingsStoreConstants';
import { SettingsStore } from './SettingsStore';
import { DebugLog } from '@/common/functions/dev';

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

export default function SettingsStoreProvider({ children }: PropsWithChildren) {
  const [renders, setRenders] = useState(0)
  SettingsStore.instance.on('any', () => setRenders(renders => renders + 1));

  debugLog('SettingsStore updated', { renders, store: SettingsStore.instance });

  return (
    <SettingsStoreContext.Provider value={SettingsStore.instance}>
      {children}
    </SettingsStoreContext.Provider>
  );
}