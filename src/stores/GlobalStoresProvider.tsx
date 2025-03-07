import { PropsWithChildren } from "react";
import { GlobalStoresContext } from "./GlobalStoresConstants";

import useCacheStoreProvider from "./CacheStore";
import useDataStoreProvider from "./DataStore";
import useSettingsStoreProvider from "./SettingsStore";
import useFavoriteStoreProvider from "./FavoriteStore";
import useRegionStoreProvider from "./RegionStore";

export default function GlobalStoresProvider({ children }: PropsWithChildren) {
  const [CacheStore] = useCacheStoreProvider();
  const [DataStore] = useDataStoreProvider();
  const [SettingsStore, { SettingsNotice, NewUser }] = useSettingsStoreProvider();
  const [FavoriteStore] = useFavoriteStoreProvider();
  const [RegionStore] = useRegionStoreProvider();

  const GlobalMall = {
    CacheStore,
    DataStore,
    SettingsStore,
    FavoriteStore,
    RegionStore,
  }
  window.GlobalMall = GlobalMall;

  console.log('GlobalStores update', GlobalMall);

  return (
    <GlobalStoresContext.Provider value={GlobalMall}>
      <NewUser />
      <SettingsNotice />
      {children}
    </GlobalStoresContext.Provider>
  );
}

declare global {
  interface Window {
    GlobalMall: any;
  }
}