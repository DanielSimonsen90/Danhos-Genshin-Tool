import { Dispatch, SetStateAction } from "react";
import { DebugLog } from "@/common/functions/dev";
import { RegionData, Traveler } from "./RegionStoreTypes";

const debugLog = DebugLog(DebugLog.DEBUGS.regionStore);

export function useRegionFunctions(
  region: RegionData, 
  setRegion: Dispatch<SetStateAction<RegionData>>
) {
  const setTraveler = (traveler: Traveler) => setRegion(region => ({
    ...region,
    traveler
  }));

  return {
    traveler: region.traveler,
    setTraveler
  };
}