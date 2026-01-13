import useAccountStore from "./AccountStore";
import { FavoriteModels } from "./AccountStoreTypes";

export const useAccountData = () => {
  const { accountData: regionData, setAccountData } = useAccountStore();
  return {
    ...regionData,
    setAccountData
  }
}

export function useFavorite<TFavoriteModel extends keyof FavoriteModels>(
  type: TFavoriteModel
): {
  favorites: Array<FavoriteModels[TFavoriteModel]>;
  add: (item: FavoriteModels[TFavoriteModel]) => void;
  remove: (item: FavoriteModels[TFavoriteModel]) => void;
  isFavorite: (item: FavoriteModels[TFavoriteModel]) => boolean;
} {
  const store = useAccountStore();
  const favoriteAPI = store.favorites.getFavorite(type);
  
  return {
    favorites: favoriteAPI.getFavorites(),
    add: favoriteAPI.add,
    remove: favoriteAPI.remove,
    isFavorite: favoriteAPI.isFavorite,
  };
}

export function useFavorites(): {
  getAllFavorites: () => import("./AccountStoreTypes").FavoritesCollection;
  hasAnyFavorites: () => boolean;
  clearFavorites: () => void;
  getFavorite: <T extends keyof FavoriteModels>(type: T) => {
    add: (item: FavoriteModels[T]) => void;
    remove: (item: FavoriteModels[T]) => void;
    isFavorite: (item: FavoriteModels[T] | string) => boolean;
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
  const store = useAccountStore();

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