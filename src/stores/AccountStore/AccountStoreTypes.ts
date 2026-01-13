import { SetStateAction } from "react";
import { PriorityLists } from "@/pages/Building/PriorityList/PriorityListTypes";
import { StorageReturn } from "@/services/StorageService";
import { ArtifactSet, Character, Domain, Mob, Weapon, Material, Model } from "@/common/models";

export type WorldRegion = 'North America' | 'Europe' | 'Asia' | 'TW, HK, MO';
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

export type AccountData = {
  worldRegion: WorldRegion;
  traveler: Traveler | undefined;
  priorityLists?: PriorityLists;
  favorites?: FavoritesCollection;
  
  selected: boolean;
};

export type AccountSettings = Pick<AccountData, 'traveler' | 'worldRegion'> & {
  /**
   * Enables account management features in the settings modal
   */
  accountCrud: boolean;
  selectedAccount: string;
  selectedAccountName: string;
}
export type AccountContextType = Record<string, AccountData | undefined>;

export type FavoriteModel<T extends keyof FavoriteModels> = {
  add: (item: FavoriteModels[T]) => void;
  remove: (item: FavoriteModels[T]) => void;
  isFavorite: (item: FavoriteModels[T]) => boolean;
  getFavorites: () => Array<FavoriteModels[T]>;
};

export type FavoritesSlice = {
  getAllFavorites: () => FavoritesCollection;
  hasAnyFavorites: () => boolean;
  clearFavorites: () => void;
  getFavorite: <T extends keyof FavoriteModels>(type: T) => FavoriteModel<T>;
};

export type AccountStore = {
  accounts: AccountContextType;
  selectedAccountName: keyof AccountContextType;
  worldRegion: WorldRegion;
  accountData: AccountData & Record<'setAccountData', AccountStore['setAccountData']>;

  get regionSettings(): AccountSettings;

  setAccountName: (name: string) => void;
  setAccountData: (update: Partial<AccountData> | ((state: AccountData) => AccountData)) => void;
  setWorldRegion: (region: WorldRegion) => void;
  setTraveler: (traveler: Traveler) => void;
  setSelectedAccount: (accountName: string) => void;
  setState: (state: SetStateAction<AccountStore>) => void;

  getGenshinServerDay(worldRegion: WorldRegion): number;
  getGenshinServerDayName(worldRegion: WorldRegion): string;

  favorites: FavoritesSlice;
  storageService: StorageReturn<AccountContextType>;
};