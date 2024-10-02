import { PropsWithChildren } from "react";
import CacheStore from "../stores/CacheStore";
import DataStore from "../stores/DataStore";

export default function GlobalStoresProvider({ children }: PropsWithChildren) {
  return (
    <DataStore>
      <CacheStore>
        {children}
      </CacheStore>
    </DataStore>
  );
}