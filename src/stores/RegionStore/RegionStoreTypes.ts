import { SetStateAction } from "react";
import { PriorityLists } from "@/pages/Building/PriorityList/PriorityListTypes";
import { StorageReturn } from "@/services/StorageService";
import { ArtifactSet, Character, Domain, Mob, Weapon, Material, Model } from "@/common/models";

export type Region = 'North America' | 'Europe' | 'Asia' | 'TW, HK, MO';
export type Traveler = 'lumine' | 'aether';

export type FavoriteModels = {
  characters: Character;
  artifacts: ArtifactSet;
  domains: Domain<any>;
  mobs: Mob;
  materials: Material;
  weapons: Weapon;
}

export type FavoritesCollection = {
  [Key in keyof FavoriteModels]: Array<FavoriteModels[Key]>;
}

export type RegionData = {
  region: Region;
  traveler: Traveler | undefined;
  priorityLists?: PriorityLists;
  favorites?: FavoritesCollection;
  
  selected: boolean;
};

export type RegionSettings = Pick<RegionData, 'traveler' | 'region'>;
export type RegionContextType = Record<Region, RegionData | undefined>;

export type FavoriteModel<T extends keyof FavoriteModels> = {
  add: (item: FavoriteModels[T]) => void;
  remove: (item: FavoriteModels[T]) => void;
  isFavorite: (item: FavoriteModels[T]) => boolean;
  getFavorites: () => Array<FavoriteModels[T]>;
};

export type FavoritesAPI = {
  getAllFavorites: () => FavoritesCollection;
  hasAnyFavorites: () => boolean;
  clearFavorites: () => void;
  getFavorite: <T extends keyof FavoriteModels>(type: T) => FavoriteModel<T>;
};

export type RegionStore = {
  regions: RegionContextType;
  currentRegion: Region;
  regionData: RegionData & Record<'setRegionData', RegionStore['setRegionData']>;

  get regionSettings(): RegionSettings;

  setRegionData: (update: Partial<RegionData> | ((state: RegionData) => RegionData)) => void;
  setRegion: (region: Region) => void;
  setTraveler: (traveler: Traveler) => void;
  setState: (state: SetStateAction<RegionStore>) => void;

  // Unified favorites API
  favorites: FavoritesAPI;

  storageService: StorageReturn<RegionContextType>;
};