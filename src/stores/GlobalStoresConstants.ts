import { createContext } from "react";
import useCacheStoreProvider from "./CacheStore/CacheStoreProvider";
import useDataStoreProvider from "./DataStore/DataStoreProvider";
import useSettingsStoreProvider from "./SettingsStore/SettingsStoreProvider";
import useFavoriteStoreProvider from "./FavoriteStore/FavoriteStoreProvider";
import useRegionStoreProvider from "./RegionStore/RegionStoreProvider";

type GlobalStoresContextType = {
  CacheStore: ReturnType<typeof useCacheStoreProvider>[0],
  DataStore: ReturnType<typeof useDataStoreProvider>[0],
  SettingsStore: ReturnType<typeof useSettingsStoreProvider>[0],
  FavoriteStore: ReturnType<typeof useFavoriteStoreProvider>[0],
  RegionStore: ReturnType<typeof useRegionStoreProvider>[0],
}
export const GlobalStoresContext = createContext<GlobalStoresContextType>(null);