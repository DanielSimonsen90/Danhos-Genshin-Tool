import { useContext } from "react";
import useFavoriteStoreProvider from "./FavoriteStoreProvider";
import { FavoriteModels, ModelsCollection } from "./FavoriteStoreTypes";

export function useFavoriteStore<
  TModelType extends keyof ModelsCollection, 
  TModel extends FavoriteModels[TModelType]
>(type?: TModelType) {
  const [store] = useFavoriteStoreProvider();

  return type ? {
    favorites: store[type],
    add: (item: TModel) => store.add(type, item as any),
    remove: (item: TModel) => store.remove(type, item as any),
    isFavorite: (item: TModel) => store.isFavorite(type, item as any),
  } : {
    favorites: [] as any,
    add: () => {},
    remove: () => {},
    isFavorite: () => false,
  }
}