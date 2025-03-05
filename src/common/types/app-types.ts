import { AppSettings } from "@/stores/SettingsStore/SettingsStoreTypes";
import { RegionSettings } from "@/stores/RegionStore/RegionStoreTypes";

export type Settings = AppSettings & RegionSettings;