import { Dispatch, SetStateAction } from "react";

export type StorageReturn<TValue> = {
  get(fallback?: TValue): TValue | undefined;
  set(value: TValue): void;
  remove(): void;
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
    }
  } as StorageReturn<TValue>);

  if (load) load(callback(key).get(defaultValue));
  
  return key ? callback(key) : callback;
}

export default StorageService;