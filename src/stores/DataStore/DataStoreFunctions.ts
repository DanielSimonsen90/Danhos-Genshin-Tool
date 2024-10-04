import { useEffect } from "react";
import { DataStore } from "./DataStoreTypes";

export function useDataStoreToWindow(store: DataStore) {
  useEffect(() => {
    window.__stores.DataStore = store;
  }, [store]);
}