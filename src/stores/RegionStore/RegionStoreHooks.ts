import useRegionStore from "./RegionStore";
import { FavoriteModels } from "./RegionStoreTypes";

export const useRegionData = () => {
  const { regionData, setRegionData } = useRegionStore();
  return {
    ...regionData,
    setRegionData
  }
}

export const useRegion = () => useRegionStore().currentRegion;
export const useTraveler = () => useRegionData().traveler;
export const usePriorityList = () => useRegionData().priorityLists;

// Backward-compatible convenience hook for typed usage (like the old useFavoriteStore)
export function useFavorite<TFavoriteModel extends keyof FavoriteModels>(
  type: TFavoriteModel
): {
  favorites: Array<FavoriteModels[TFavoriteModel]>;
  add: (item: FavoriteModels[TFavoriteModel]) => void;
  remove: (item: FavoriteModels[TFavoriteModel]) => void;
  isFavorite: (item: FavoriteModels[TFavoriteModel]) => boolean;
} {
  const store = useRegionStore();
  const favoriteAPI = store.favorites.getFavorite(type);
  
  return {
    favorites: favoriteAPI.getFavorites(),
    add: favoriteAPI.add,
    remove: favoriteAPI.remove,
    isFavorite: favoriteAPI.isFavorite,
  };
}

// Favorite hook similar to the old FavoriteStore
export function useFavorites(): {
  getAllFavorites: () => import("./RegionStoreTypes").FavoritesCollection;
  hasAnyFavorites: () => boolean;
  clearFavorites: () => void;
  getFavorite: <T extends keyof FavoriteModels>(type: T) => {
    add: (item: FavoriteModels[T]) => void;
    remove: (item: FavoriteModels[T]) => void;
    isFavorite: (item: FavoriteModels[T]) => boolean;
    getFavorites: () => Array<FavoriteModels[T]>;
  };
};

export function useFavorites<TModelType extends keyof FavoriteModels>(
  type?: TModelType
): {
  favorites: Array<FavoriteModels[TModelType]>;
  add: (item: FavoriteModels[TModelType]) => void;
  remove: (item: FavoriteModels[TModelType]) => void;
  isFavorite: (item: FavoriteModels[TModelType]) => boolean;
};

export function useFavorites<
  TModelType extends keyof FavoriteModels, 
  TModel extends FavoriteModels[TModelType]
>(type?: TModelType) {
  const store = useRegionStore();

  return type ? {
    favorites: store.favorites.getFavorite(type).getFavorites(),
    add: (item: TModel) => store.favorites.getFavorite(type).add(item as any),
    remove: (item: TModel) => store.favorites.getFavorite(type).remove(item as any),
    isFavorite: (item: TModel) => store.favorites.getFavorite(type).isFavorite(item as any),
  } : {
    getAllFavorites: store.favorites.getAllFavorites,
    hasAnyFavorites: store.favorites.hasAnyFavorites,
    clearFavorites: store.favorites.clearFavorites,
    getFavorite: store.favorites.getFavorite,
  };
}