type LocalStorageReturn = {
  get<TValue>(): TValue | undefined;
  set<TValue>(value: TValue): void;
  load<TValue>(defaultValue: string): TValue;
  remove(): void;
}

export function useLocalStorage<TValue>(): ((key: string) => LocalStorageReturn);
export function useLocalStorage<TValue>(key: string): LocalStorageReturn;
export function useLocalStorage<TValue>(key?: string) {
  const callback = (key: string) => ({
    get: function(): TValue | undefined {
      const item = localStorage.getItem(key);
      return item ? item.startsWith('{') ? JSON.parse(item) : item : undefined;
    },
    set: function(value: TValue) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    load: function<TValue>(defaultValue: string) {
      if (!localStorage.getItem(key)) localStorage.setItem(key, defaultValue);
      const item = localStorage.getItem(key);

      if (item.startsWith('{') || item.startsWith('[')) return JSON.parse(item);
      return item as unknown as TValue;
    },
    remove: function() {
      localStorage.removeItem(key);
    }
  } as LocalStorageReturn);

  return key ? callback(key) : callback;
}