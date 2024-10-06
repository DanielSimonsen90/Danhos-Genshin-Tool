import type { DataStore } from './DataStoreConstants';
import type { useDataStoreFunctions } from './DataStoreFunctions';

export type DataStore = typeof DataStore
export type DataStoreContext = DataStore & ReturnType<typeof useDataStoreFunctions>