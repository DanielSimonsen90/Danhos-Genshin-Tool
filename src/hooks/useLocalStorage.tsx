export type LocalStorageReturn<TValue> = {
  get(fallback?: TValue): TValue | undefined;
  set(value: TValue): void;
  remove(): void;
}

export function useLocalStorage<TValue>(): ((key: string) => LocalStorageReturn<TValue>);
export function useLocalStorage<TValue>(key: string): LocalStorageReturn<TValue>;
export function useLocalStorage<TValue>(key?: string) {
  const callback = (key: string) => ({
    get: function(fallback?: any): TValue | undefined {
      const item = localStorage.getItem(key) ?? fallback;
      return item ? typeof item === 'string' && item.startsWith('{') ? JSON.parse(item) : item : undefined;
    },
    set: function(value: TValue) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove: function() {
      localStorage.removeItem(key);
    }
  } as LocalStorageReturn<TValue>);

  return key ? callback(key) : callback;
}