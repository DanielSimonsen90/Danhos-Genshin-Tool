import { FavoritesCollection } from ".";
import { useAccountStore } from "./AccountStore";
import { FavoriteModels } from "./AccountStoreTypes";

export const useAccountData = () => {
  const { selectedAccount, setAccountData } = useAccountStore();
  return {
    ...selectedAccount,
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
  const favoriteAPI = store.getFavorite(type);
  
  return {
    favorites: favoriteAPI.getFavorites(),
    add: favoriteAPI.add,
    remove: favoriteAPI.remove,
    isFavorite: favoriteAPI.isFavorite,
  };
}

export function useFavorites(): {
  getAllFavorites: () => FavoritesCollection;
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
    favorites: store.getFavorite(type).getFavorites(),
    add: (item: TModel) => store.getFavorite(type).add(item as any),
    remove: (item: TModel) => store.getFavorite(type).remove(item as any),
    isFavorite: (item: TModel) => store.getFavorite(type).isFavorite(item as any),
  } : {
    getAllFavorites: store.getAllFavorites,
    hasAnyFavorites: store.hasAnyFavorites,
    clearFavorites: store.clearFavorites,
    getFavorite: store.getFavorite,
  };
}