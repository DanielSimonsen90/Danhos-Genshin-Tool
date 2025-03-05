import { useContext } from "react";
import { GlobalStoresContext } from "../GlobalStoresConstants";

export const useRegionStore = () => useContext(GlobalStoresContext).RegionStore;
export const useRegionData = () => useRegionStore().regionData;

export const useRegion = () => useRegionStore().region;
export const useTraveler = () => useRegionData().traveler;
export const usePriorityList = () => useRegionData().priorityList;