import { useState } from 'react';
import { DebugLog } from '@/common/functions/dev';
import { Cache } from './CacheStoreTypes';
import { useCacheFunctions, useCacheSaveEffect, useCacheStoreToWindow } from './CacheStoreFunctions';

const debugLog = DebugLog(DebugLog.DEBUGS.cacheStore);

export default function useCacheStoreProvider() {
  const [cache, setCache] = useState<Cache>({} as Cache);
  const store = useCacheFunctions(cache, setCache);

  useCacheSaveEffect(cache, setCache);
  useCacheStoreToWindow(store);
  debugLog('[Provider] Updated', cache);

  return [{ ...store, cache }] as const;
}