import { PropsWithChildren } from "react";
import CacheStore from "./stores/CacheStore";

export default function GlobalStoresProvider({ children }: PropsWithChildren) {
  return (
    <CacheStore>
      {children}
    </CacheStore>
  );
}