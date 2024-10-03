import { PropsWithChildren } from "react";
import CacheStore from "../stores/CacheStore";
import DataStore from "../stores/DataStore";
import SettingsStore from "./SettingsStore";

export default function GlobalStoresProvider({ children }: PropsWithChildren) {
  return (
    <DataStore>
      <SettingsStore>
        <CacheStore>
          {children}
        </CacheStore>
      </SettingsStore>
    </DataStore>
  );
}