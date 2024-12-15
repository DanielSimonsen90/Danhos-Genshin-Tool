import { SetStateAction, useContext } from "react";
import { Settings } from "./SettingsStoreTypes";
import { GlobalStoresContext } from "../GlobalStoresConstants";

export const useSettingsStore = () => useContext(GlobalStoresContext).SettingsStore;
export function useSetting<TKey extends keyof Settings>(key: TKey) {
  const store = useSettingsStore();
  return [store.getSetting(key), (value: Settings[TKey]) => store.updateSettings({ [key]: value })] as const;
}

type UseSettingsReturn<TKeys extends Array<keyof Settings>> = { 
  [K in TKeys[number]]: Settings[K];
};
export function useSettings<TKeys extends Array<keyof Settings>>(...keys: TKeys): UseSettingsReturn<TKeys> {
  const store = useSettingsStore();
  return keys.reduce((acc, key) => {
    acc[key] = store.getSetting(key);
    return acc;
  }, {} as any) as UseSettingsReturn<TKeys>;
}