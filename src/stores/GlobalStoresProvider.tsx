import { PropsWithChildren } from "react";
import { GlobalStoresContext } from "./GlobalStoresConstants";

import useCacheStoreProvider from "./CacheStore";
import useDataStoreProvider from "./DataStore";
import useSettingsStoreProvider from "./SettingsStore";
import useFavoriteStoreProvider from "./FavoriteStore";

export default function GlobalStoresProvider({ children }: PropsWithChildren) {
  const [CacheStore] = useCacheStoreProvider();
  const [DataStore] = useDataStoreProvider();
  const [SettingsStore, { SettingsNotice, NewUser }] = useSettingsStoreProvider();
  const [FavoriteStore] = useFavoriteStoreProvider();

  return (
    <GlobalStoresContext.Provider value={{ CacheStore, DataStore, SettingsStore, FavoriteStore }}>
      <NewUser />
      <SettingsNotice />
      {children}
    </GlobalStoresContext.Provider>
  );
}