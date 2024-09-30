import { useState, PropsWithChildren } from 'react';
import { CacheStoreContext } from './CacheStoreConstants';
import CacheStore from './CacheStore';

export default function CacheStoreProviderProvider({ children }: PropsWithChildren) {
  const [store] = useState(new CacheStore())
  
  return (
    <CacheStoreContext.Provider value={store}>
      {children}
    </CacheStoreContext.Provider>
  );
}