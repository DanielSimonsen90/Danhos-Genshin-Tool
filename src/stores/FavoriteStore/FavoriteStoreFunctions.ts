import { SetStateAction, Dispatch } from 'react'
import { FavoriteModels, ModelsCollection } from './FavoriteStoreTypes'
import { LocalStorageReturn } from '@/hooks/useLocalStorage';

export function useFavoriteStoreFunctions(
  data: ModelsCollection, 
  set: Dispatch<SetStateAction<ModelsCollection>>,
  localStorage: LocalStorageReturn<ModelsCollection>,
) {
  const add = <T extends keyof ModelsCollection>(type: T, item: FavoriteModels[T]) => {
    console.log(`${type} added to favorites`, item);
    set(data => ({
      ...data,
      [type]: [...data[type], item],
    }));
  }

  const remove = <T extends keyof ModelsCollection>(type: T, item: FavoriteModels[T]) => {
    set(data => ({
      ...data,
      [type]: (data[type] as Array<any>).filter((i: any) => i.name !== item.name),
    }));
  }

  const isFavorite = <T extends keyof ModelsCollection>(type: T, item: FavoriteModels[T]) => data[type].some(entry => entry.name === item.name);

  const clear = () => set({
    characters: [],
    artifacts: [],
    domains: [],
  });

  return { add, remove, isFavorite, clear };
}