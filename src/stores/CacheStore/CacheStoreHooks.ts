import { useContext } from "react";
import { GlobalStoresContext } from "../GlobalStoresConstants";

export const useCacheStore = () => useContext(GlobalStoresContext).CacheStore;