import useRegionStore from "./RegionStore";

export const useRegionData = () => {
  const { regionData, setRegionData } = useRegionStore();
  return {
    ...regionData,
    setRegionData
  }
}

export const useRegion = () => useRegionStore().currentRegion;
export const useTraveler = () => useRegionData().traveler;
export const usePriorityList = () => useRegionData().priorityLists;