import { SetStateAction, useCallback, useMemo, useState } from "react";

import { DebugLog } from "@/common/functions/dev";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import { RegionContextType } from "./RegionContextType";
import { RegionData } from "./RegionStoreTypes";
import { DEFAULT_REGION, LOCAL_STORAGE_KEY } from "./RegionStoreConstants";
import { useRegionFunctions } from "./RegionStoreFunctions";

const debugLog = DebugLog(DebugLog.DEBUGS.regionStore);

export default function useRegionStoreProvider() {
  const localStorage = useLocalStorage<RegionContextType>(LOCAL_STORAGE_KEY);
  const [regions, _setRegions] = useState(() => Object.assign(new RegionContextType(DEFAULT_REGION), localStorage.get() ?? {}));
  const region = useMemo(() => regions.current, [regions]);
  const setRegion = useCallback((update: SetStateAction<RegionData>) => _setRegions(state => {
    const resolvedUpdate = typeof update === 'function' ? update(state.current) : update;
    const desiredIndex = state.findIndex(regionData => regionData.region === resolvedUpdate.region);
    const isUpdated = desiredIndex !== -1 || JSON.stringify(resolvedUpdate) !== JSON.stringify(state[desiredIndex]);

    const next = Object.assign(
      state, 
      isUpdated ? state.splice(desiredIndex, 1, resolvedUpdate) : [],
      { index: desiredIndex }
    );
    if (!next.includes(resolvedUpdate)) next.push(resolvedUpdate);

    debugLog('RegionStore updated', {
      next, state, resolvedUpdate, desiredIndex, isUpdated
    });
    localStorage.set(next);
    return next;
  }), [localStorage]);

  const store = useRegionFunctions(region, setRegion);

  return [{ ...store, regions, region, setRegion }] as const;
}