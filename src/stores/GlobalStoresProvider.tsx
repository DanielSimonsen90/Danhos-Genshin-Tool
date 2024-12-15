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

  return (
    <GlobalStoresContext.Provider value={{ CacheStore, DataStore, SettingsStore, FavoriteStore, RegionStore }}>
      <NewUser />
      <SettingsNotice />
      {children}
    </GlobalStoresContext.Provider>
  );
}