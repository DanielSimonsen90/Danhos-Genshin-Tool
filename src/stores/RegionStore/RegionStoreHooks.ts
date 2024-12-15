import { useContext } from "react";
import { GlobalStoresContext } from "../GlobalStoresConstants";

export const useRegionStore = () => useContext(GlobalStoresContext).RegionStore;
export const useRegion = () => useRegionStore().region;
export const useTraveler = () => useRegion().traveler;
export const usePriorityList = () => useRegion().priorityList;