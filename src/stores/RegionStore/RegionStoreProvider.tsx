import { SetStateAction, useCallback, useMemo, useState } from "react";

import { DebugLog } from "@/common/functions/dev";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { RegionContextType } from "./RegionContextType";
import { RegionData } from "./RegionStoreTypes";
import { DEFAULT_REGION, DEFAULT_REGION_DATA, LOCAL_STORAGE_KEY, REGIONS } from "./RegionStoreConstants";
import { useRegionFunctions } from "./RegionStoreFunctions";

const debugLog = DebugLog(DebugLog.DEBUGS.regionStore);

export default function useRegionStoreProvider() {
  const localStorage = useLocalStorage<RegionContextType>(LOCAL_STORAGE_KEY);
  const [regions, _setRegions] = useState(() => localStorage.get() ?? { [DEFAULT_REGION]: DEFAULT_REGION_DATA });
  // const currentRegion = useMemo(() => Object.keys(regions).find(region => regions[region as keyof RegionContextType].selected) as keyof RegionContextType, [regions]);
  const currentRegion = Object.keys(regions).find(region => regions[region as keyof RegionContextType].selected) as keyof RegionContextType;
  // const regionData = useMemo(() => regions[currentRegion], [regions, currentRegion]);
  const regionData = regions[currentRegion];
  const setRegionData = useCallback((update: SetStateAction<RegionData>) => {
    _setRegions(state => {
      const resolvedRegionDataUpdate = typeof update === 'function'
        ? update(state[currentRegion])
        : update;

      // Define the next selected regionData
      const next = REGIONS.reduce((acc, _region) => {
        const region = _region as keyof RegionContextType;
        const storedData: RegionData = state[region] ?? Object.assign(
          {},
          DEFAULT_REGION_DATA,
          resolvedRegionDataUpdate,
          { region, selected: false } as RegionData
        );

        if (region === resolvedRegionDataUpdate.region) acc[region] = {
          ...storedData,
          ...resolvedRegionDataUpdate,
          selected: true,
        };
        else if (storedData.selected) acc[region] = { ...storedData, selected: false };
        else if (state[region]) acc[region] = storedData;

        return acc;
      }, {} as RegionContextType);

      // If no region is selected, create the default region
      if (Object.keys(next).length === 0) next[DEFAULT_REGION] = {
        ...DEFAULT_REGION_DATA,
        ...update,
        selected: true,
      };

      debugLog('RegionStore updated', {
        state, next,
        resolvedRegionDataUpdate,
        switchedActiveRegion: resolvedRegionDataUpdate.region !== currentRegion
      });

      localStorage.set(next);
      debugLog('Set localStorage', next);
      return next;
    });
  }, [localStorage, currentRegion, _setRegions]);

  const store = useRegionFunctions(regionData, setRegionData);
  const storeReturn = { ...store, currentRegion, regions, regionData, setRegionData };
  debugLog('RegionStore update', storeReturn)

  return [storeReturn] as const;
}