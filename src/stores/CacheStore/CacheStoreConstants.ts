import { createContext } from "react";
import { CacheStoreProviderContextType } from "./CacheStoreTypes";

export const CacheStoreContext = createContext<CacheStoreProviderContextType>({} as CacheStoreProviderContextType);