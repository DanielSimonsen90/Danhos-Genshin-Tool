import { ChangeableSettings } from "@/stores/SettingsStore/SettingsStoreTypes";
import { AccountSettings } from "@/stores/AccountStore/AccountStoreTypes";

export type Settings = ChangeableSettings & AccountSettings;