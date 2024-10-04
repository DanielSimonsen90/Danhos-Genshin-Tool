import { PropsWithChildren } from "react";
import { GlobalStoresContext } from "./GlobalStoresConstants";

import useCacheStoreProvider from "./CacheStore/CacheStoreProvider";
import useDataStoreProvider from "./DataStore/DataStoreProvider";
import useSettingsStoreProvider from "./SettingsStore/SettingsStoreProvider";

export default function GlobalStoresProvider({ children }: PropsWithChildren) {
  const [CacheStore] = useCacheStoreProvider();
  const [DataStore] = useDataStoreProvider();
  const [SettingsStore, { 
    didSettingsChange, hideNotice, 
    SettingsNotice
  }] = useSettingsStoreProvider();

  return (
    <GlobalStoresContext.Provider value={{ CacheStore, DataStore, SettingsStore }}>
      {didSettingsChange && !hideNotice && <SettingsNotice />}
      {children}
    </GlobalStoresContext.Provider>
  );
}