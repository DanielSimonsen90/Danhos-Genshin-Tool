import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { DEFAULT_SETTINGS } from "../SettingsStoreConstants";

export default new StoreBuilder()
  .addState({
    settings: DEFAULT_SETTINGS,
    initialSettings: DEFAULT_SETTINGS,
    hideNotice: false,
  });