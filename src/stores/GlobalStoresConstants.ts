import { createContext } from "react";
import useCacheStoreProvider from "./CacheStore/CacheStoreProvider";
import useDataStoreProvider from "./DataStore/DataStoreProvider";
import useSettingsStoreProvider from "./SettingsStore/SettingsStoreProvider";

type GlobalStoresContextType = {
  CacheStore: ReturnType<typeof useCacheStoreProvider>[0],
  DataStore: ReturnType<typeof useDataStoreProvider>[0],
  SettingsStore: ReturnType<typeof useSettingsStoreProvider>[0],
}
export const GlobalStoresContext = createContext<GlobalStoresContextType>(null);