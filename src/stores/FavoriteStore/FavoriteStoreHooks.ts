import { FavoriteModels, FavoriteStore } from "./FavoriteStoreTypes";
import { useFavoriteStoreProvider } from "./FavoriteStore";


export function useFavoriteStore(): FavoriteStore;
export function useFavoriteStore<TModelType extends keyof FavoriteModels>(
  type?: TModelType
): {
  favorites: FavoriteModels[TModelType];
  add: (item: FavoriteModels[TModelType]) => void;
  remove: (item: FavoriteModels[TModelType]) => void;
  isFavorite: (item: FavoriteModels[TModelType]) => boolean;
};

export function useFavoriteStore<
  TModelType extends keyof FavoriteModels, 
  TModel extends FavoriteModels[TModelType]
>(type?: TModelType) {
  const store = useFavoriteStoreProvider();

  return type ? {
    favorites: store[type],
    add: (item: TModel) => store.add(type, item as any),
    remove: (item: TModel) => store.remove(type, item as any),
    isFavorite: (item: TModel) => store.isFavorite(type, item as any),
  } : store;
}