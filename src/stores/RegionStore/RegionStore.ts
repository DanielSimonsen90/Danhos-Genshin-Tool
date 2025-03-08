import { create } from 'zustand';

import * as ObjectUtils from '@/common/functions/object';
import StorageService from '@/services/StorageService';
import { RegionData, Region, Traveler, RegionContextType, RegionStore } from './RegionStoreTypes';
import { DEFAULT_REGION, DEFAULT_REGION_DATA, LOCAL_STORAGE_KEY, REGIONS } from './RegionStoreConstants';

export const useRegionStore = create<RegionStore>((setState, getState) => {
  const storageService = StorageService<RegionContextType>(LOCAL_STORAGE_KEY);
  const regions = storageService.get() ?? { [DEFAULT_REGION]: DEFAULT_REGION_DATA } as RegionContextType;
  const region = Object.keys(regions).find(region => regions[region as keyof RegionContextType].selected) as keyof RegionContextType;
  const regionData = regions[region];

  const setRegionData = (update: Partial<RegionData> | ((state: RegionData) => RegionData)) => {
    const resolvedRegionDataUpdate = typeof update === 'function'
      ? update(getState().regionData)
      : update;

    // Define the next selected regionData
    const next = REGIONS.reduce((acc, _region) => {
      const region = _region as keyof RegionContextType;
      const storedData: RegionData = regions[region] ?? Object.assign(
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
      else if (regions[region]) acc[region] = storedData;

      return acc;
    }, {} as RegionContextType);

    // If no region is selected, create the default region
    if (Object.keys(next).length === 0) next[DEFAULT_REGION] = {
      ...DEFAULT_REGION_DATA,
      ...update,
      selected: true,
    };

    storageService.set(next);
    setState({
      regions: next,
      currentRegion: resolvedRegionDataUpdate.region,
      regionData: next[resolvedRegionDataUpdate.region],
    });
  }
  const setRegion = (region: Region) => setRegionData({ region });
  const setTraveler = (traveler: Traveler) => setRegionData({ traveler });

  return {
    regions,
    currentRegion: region,
    regionData,
    get regionSettings() {
      return ObjectUtils.pick(getState().regionData, 'region', 'traveler');
    },
    
    setRegionData,
    setRegion,
    setTraveler,
  };
});

export default useRegionStore;