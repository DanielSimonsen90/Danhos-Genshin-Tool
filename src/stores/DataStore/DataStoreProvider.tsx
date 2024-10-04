import { PropsWithChildren, useState } from 'react';
import { DataStoreContext, DataStore } from './DataStoreConstants';
import { useDataStoreToWindow } from './DataStoreFunctions';

export default function DataStoreProvider({ children }: PropsWithChildren) {
  const [store, setStore] = useState(DataStore);
  
  useDataStoreToWindow(store);

  return (
    <DataStoreContext.Provider value={store}>
      {children}
    </DataStoreContext.Provider>
  );
}