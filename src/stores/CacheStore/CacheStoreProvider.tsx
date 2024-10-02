import { useState, PropsWithChildren } from 'react';
import { CacheStoreContext } from './CacheStoreConstants';
import CacheStore from './CacheStore';
import { DebugLog } from '@/common/functions/dev';

const debugLog = DebugLog(DebugLog.DEBUGS.cacheStore);

export default function CacheStoreProviderProvider({ children }: PropsWithChildren) {
  
  const [updates, setUpdates] = useState(0);
  CacheStore.instance.on('any', () => setUpdates(v => v + 1));
  
  debugLog('[Provider] Updated', { store: CacheStore.instance, updates });

  return (
    <CacheStoreContext.Provider value={CacheStore.instance}>
      <p>{CacheStore.instance.get('currentSearch', '')}</p>
      {children}
    </CacheStoreContext.Provider>
  );
}