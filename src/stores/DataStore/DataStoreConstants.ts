import { createContext } from "react";
import type { DataStoreContextType } from "./DataStoreTypes";
import DataStore from "./DataStore";

export const DataStoreContext = createContext<DataStoreContextType>(DataStore.instance);