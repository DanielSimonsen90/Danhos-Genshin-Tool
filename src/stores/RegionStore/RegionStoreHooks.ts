import useRegionStore from "./RegionStore";

export const useRegionData = () => useRegionStore().regionData;

export const useRegion = () => useRegionStore().currentRegion;
export const useTraveler = () => useRegionData().traveler;
export const usePriorityList = () => useRegionData().priorityLists;