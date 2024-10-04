import { DependencyList, SetStateAction, useContext, useEffect } from "react";
import { SettingsStoreContext } from "./SettingsStoreConstants";
import { Settings } from "./SettingsStoreTypes";

export const useSettingsStore = () => useContext(SettingsStoreContext);
export function useSetting<TKey extends keyof Settings>(key: TKey) {
  const store = useSettingsStore();
  return [store.get(key), (value: Settings[TKey]) => store.update({ [key]: value })] as const;
}

type UseSettingsReturn<TKeys extends Array<keyof Settings>> = { 
  [K in TKeys[number]]: Settings[K];
};
export function useSettings<TKeys extends Array<keyof Settings>>(...keys: TKeys): UseSettingsReturn<TKeys> {
  const store = useSettingsStore();
  return keys.reduce((acc, key) => {
    acc[key] = store.get(key);
    return acc;
  }, {} as any) as UseSettingsReturn<TKeys>;
}

export function useSettingEffect<TKey extends keyof Settings>(key: TKey, value: Settings[TKey]): void;
export function useSettingEffect<TKey extends keyof Settings>(key: TKey, value: SetStateAction<Settings[TKey]>, deps: DependencyList): void;
export function useSettingEffect<TKey extends keyof Settings>(key: TKey, value: SetStateAction<Settings[TKey]>, deps?: DependencyList) {
  const store = useSettingsStore();

  useEffect(() => {
    const currentValue = store.get(key);
    const newValue = typeof value === 'function' ? value(currentValue) : value;
    if (JSON.stringify(currentValue) !== JSON.stringify(newValue)) {
      store.update({ [key]: newValue });
    }
  }, [key, value, store, ...(deps ?? [])]);
}