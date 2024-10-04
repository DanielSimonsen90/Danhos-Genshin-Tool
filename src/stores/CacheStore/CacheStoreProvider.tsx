import { useState, PropsWithChildren } from 'react';
import { DebugLog } from '@/common/functions/dev';
import { Cache } from './CacheStoreTypes';
import { CacheStoreContext } from './CacheStoreConstants';
import { useCacheFunctions, useCacheSaveEffect, useCacheStoreToWindow } from './CacheStoreFunctions';

const debugLog = DebugLog(DebugLog.DEBUGS.cacheStore);

export default function CacheStoreProviderProvider({ children }: PropsWithChildren) {
  const [cache, setCache] = useState<Cache>({} as Cache);
  const store = useCacheFunctions(cache, setCache);
  
  useCacheSaveEffect(cache);
  useCacheStoreToWindow(store);
  debugLog('[Provider] Updated', cache);

  return (
    <CacheStoreContext.Provider value={store}>
      {children}
    </CacheStoreContext.Provider>
  );
}