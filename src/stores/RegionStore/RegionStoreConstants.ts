import { Region, RegionData } from "./RegionStoreTypes";

export const LOCAL_STORAGE_KEY = 'regions';
export const DEFAULT_REGION: Region = 'Europe';
export const DEFAULT_REGION_DATA: RegionData = {
  region: DEFAULT_REGION,
  selected: true,
  traveler: undefined,
  priorityList: undefined,
};

export const REGIONS: Array<Region> = ['Europe', 'North America', 'Asia', 'TW, HK, MO'];