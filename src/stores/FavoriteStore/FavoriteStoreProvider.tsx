import { useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_KEY } from './FavoriteStoreConstants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ModelsCollection, FavoriteStoreContextType } from './FavoriteStoreTypes';
import { useFavoriteStoreFunctions } from './FavoriteStoreFunctions';

export default function useFavoriteStoreProvider() {
  const localStorage = useLocalStorage<ModelsCollection>(LOCAL_STORAGE_KEY);
  const [data, setData] = useState<ModelsCollection>(localStorage.get({
    artifacts: [],
    characters: [],
    domains: [],
  }));
  const functions = useFavoriteStoreFunctions(data, setData);
  const hasItems = useMemo(() => Object.keys(data).some((key) => {
    if (data[key as keyof typeof data].length > 0) {
      return true;
    }
  }), [data]);

  useEffect(() => {
    hasItems ? localStorage.set(data) : localStorage.remove();
  }, [data]);

  return [{ ...data, ...functions }] as [FavoriteStoreContextType];
}