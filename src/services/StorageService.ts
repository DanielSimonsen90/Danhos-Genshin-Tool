import { Dispatch, SetStateAction } from "react";

export type StorageReturn<TValue> = {
  get(fallback?: TValue): TValue | undefined;
  set(value: TValue): void;
  remove(): void;
  readonly key: string;
}

function StorageService<TValue>(): ((key: string) => StorageReturn<TValue>);
function StorageService<TValue>(key: string): StorageReturn<TValue>;
function StorageService<TValue>(key: string, load: Dispatch<SetStateAction<TValue>>, defaultValue: TValue): StorageReturn<TValue>;
function StorageService<TValue>(key?: string, load?: Dispatch<SetStateAction<TValue>>, defaultValue?: TValue) {
  const callback = (key: string) => ({
    get: function(fallback?: any): TValue | undefined {
      const item = localStorage.getItem(key) ?? fallback;
      return item ? typeof item === 'string' && (item.startsWith('{') || item.startsWith('[')) ? JSON.parse(item) : item : undefined;
    },
    set: function(value: TValue) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove: function() {
      localStorage.removeItem(key);
    },
    get key() {
      return key;
    },
  } as StorageReturn<TValue>);

  if (load) {
    const loaded = callback(key).get(defaultValue);
    if (loaded && JSON.stringify(loaded) !== JSON.stringify(defaultValue)) load(loaded);
  }
  
  return key ? callback(key) : callback;
}

export default StorageService;