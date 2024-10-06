import { useState } from 'react';
import { DataStore } from './DataStoreConstants';
import { useDataStoreFunctions, useDataStoreToWindow } from './DataStoreFunctions';

export default function useDataStoreProvider() {
  const [store] = useState(DataStore);
  const functions = useDataStoreFunctions(store);

  useDataStoreToWindow(store);

  return [{...store, ...functions }];
}