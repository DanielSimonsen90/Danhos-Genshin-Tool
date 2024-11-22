import { SetStateAction, Dispatch } from 'react'
import { FavoriteModels, ModelsCollection } from './FavoriteStoreTypes'

export function useFavoriteStoreFunctions(data: ModelsCollection, set: Dispatch<SetStateAction<ModelsCollection>>) {
  const add = <T extends keyof ModelsCollection>(type: T, item: FavoriteModels[T]) => {
    console.log(`${type} added to favorites`, item);
    set({
      ...data,
      [type]: [...data[type], item],
    });
  }

  const remove = <T extends keyof ModelsCollection>(type: T, item: FavoriteModels[T]) => {
    set({
      ...data,
      [type]: (data[type] as Array<any>).filter((i: any) => i !== item),
    });
  }

  const isFavorite = <T extends keyof ModelsCollection>(type: T, item: FavoriteModels[T]) => data[type].includes(item as any);

  const clear = () => set({
    characters: [],
    artifacts: [],
    domains: [],
  });

  return { add, remove, isFavorite, clear };
}