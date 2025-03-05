import { SetStateAction } from "react";
import { Region, RegionData, Traveler } from "./RegionStoreTypes";

export function useRegionFunctions(
  regionData: RegionData, 
  setRegionData: (update: SetStateAction<Partial<RegionData>>) => void
) {
  const setRegion = (region: Region) => setRegionData(({ region }));
  const setTraveler = (traveler: Traveler) => setRegionData(data => ({
    ...data,
    traveler
  }))

  return {
    ...regionData,
    setRegion,
    setTraveler
  };
}