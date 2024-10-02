import { createContext } from "react";
import { CacheStoreProviderContextType } from "./CacheStoreTypes";
import CacheStore from "./CacheStore";

export const CacheStoreContext = createContext<CacheStoreProviderContextType>(CacheStore.instance);