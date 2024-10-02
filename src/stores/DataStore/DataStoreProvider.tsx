import { PropsWithChildren } from 'react';
import { DataStoreContext } from './DataStoreConstants';
import DataStore from './DataStore';

export default function DataStoreProvider({ children }: PropsWithChildren) {
  return (
    <DataStoreContext.Provider value={DataStore.instance}>
      {children}
    </DataStoreContext.Provider>
  );
}