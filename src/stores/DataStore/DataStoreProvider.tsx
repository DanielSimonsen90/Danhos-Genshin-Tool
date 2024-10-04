import { useState } from 'react';
import { DataStore } from './DataStoreConstants';
import { useDataStoreToWindow } from './DataStoreFunctions';

export default function useDataStoreProvider() {
  const [store] = useState(DataStore);
  
  useDataStoreToWindow(store);

  return [store];
}