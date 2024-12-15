import { RegionData } from "./RegionStoreTypes";

export const LOCAL_STORAGE_KEY = 'regions';
export const DEFAULT_REGION: RegionData = {
  region: 'Europe',
  traveler: undefined,
  priorityList: undefined,
};