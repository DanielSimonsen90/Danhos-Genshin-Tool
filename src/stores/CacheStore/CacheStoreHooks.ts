import { useContext } from "react";
import { CacheStoreContext } from "./CacheStoreConstants";

export const useCacheStore = () => useContext(CacheStoreContext);