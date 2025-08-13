import { WorldRegion, RegionData, FavoritesCollection } from "./RegionStoreTypes";

export const LOCAL_STORAGE_KEY = 'regions';
export const DEFAULT_REGION: WorldRegion = 'Europe';

export const DEFAULT_FAVORITES: FavoritesCollection = {
  characters: [],
  artifacts: [],
  domains: [],
  materials: [],
  weapons: [],
  mobs: [],
};

export const DEFAULT_REGION_DATA: RegionData = {
  region: DEFAULT_REGION,
  selected: true,
  traveler: 'aether',
  priorityLists: undefined,
  favorites: DEFAULT_FAVORITES,
};

export const REGIONS: Array<WorldRegion> = ['Europe', 'North America', 'Asia', 'TW, HK, MO'];