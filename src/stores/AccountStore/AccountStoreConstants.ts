import { WorldRegion, AccountData, FavoritesCollection } from "./AccountStoreTypes";

export const LOCAL_STORAGE_KEY__LEGACY = 'regions';
export const LOCAL_STORAGE_KEY = 'accounts';
export const DEFAULT_WORLD_REGION: WorldRegion = 'Europe';
export const DEFAULT_ACCOUNT_NAME = 'main';

export const DEFAULT_FAVORITES: FavoritesCollection = {
  characters: [],
  artifacts: [],
  domains: [],
  materials: [],
  weapons: [],
  mobs: [],
};

export const DEFAULT_ACCOUNT_DATA: AccountData = {
  worldRegion: DEFAULT_WORLD_REGION,
  selected: true,
  traveler: 'aether',
  priorityLists: undefined,
  favorites: DEFAULT_FAVORITES,
} as const;

export const WORLD_REGIONS: Array<WorldRegion> = ['Europe', 'North America', 'Asia', 'TW, HK, MO'];