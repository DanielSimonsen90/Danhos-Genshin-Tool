import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FavoriteModels, FavoriteStore, ModelsCollection } from "./FavoriteStoreTypes";

export const useFavoriteStoreProvider = create<FavoriteStore>()(persist((setState, getState) => {  
  const data: ModelsCollection = {
    characters: [],
    artifacts: [],
    domains: [],
    materials: [],
    weapons: [],
    mobs: [],
  };

  const add = <T extends keyof ModelsCollection>(type: T, item: FavoriteModels[T]) => {
    setState(data => ({
      ...data,
      [type]: [...data[type], item]
    }));
  };
  const remove = <T extends keyof ModelsCollection>(type: T, item: FavoriteModels[T]) => {
    setState(data => ({
      ...data,
      // @ts-ignore
      [type]: data[type].filter(i => i.name !== item.name)
    }));
  }
  const isFavorite = <T extends keyof ModelsCollection>(type: T, item: FavoriteModels[T]) => getState()[type].some(entry => entry.name === item.name);  
  const clear = () => setState({
    characters: [],
    artifacts: [],
    domains: [],
    materials: [],
    weapons: [],
    mobs: [],
  });
  const getAll = () => {
    const keys = Object.keys(data) as (keyof ModelsCollection)[];
    return keys.reduce((acc, key) => {
      acc[key as keyof ModelsCollection] = getState()[key] as any;
      return acc;
    }, {} as ModelsCollection);
  };
  const hasAnyFavorites = () => Object.values(getState()).some(favorites => favorites.length > 0);

  return { 
    ...data,
    add, remove, isFavorite, 
    clear, getAll, hasAnyFavorites
   };
}, { name: "FavoriteStore" }));