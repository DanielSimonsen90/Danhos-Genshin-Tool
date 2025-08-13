import { useCallback } from 'react';

interface UseTabContentProps {
  id?: string;
}

export function useTabContent({ id }: UseTabContentProps = {}) {
  const getKeyName = useCallback((key: any) => {
    return id ? `#${id}-${key}` : key;
  }, [id]);

  return {
    getKeyName
  };
}
