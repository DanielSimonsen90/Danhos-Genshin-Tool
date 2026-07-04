import ObjectUtils from "@/common/functions/object";
import { DebugLog } from "@/common/functions/dev";
import MemoizeService from "@/services/MemoizeService";
import StoreBuilder from "@/stores/_baseStore/StoreBuilder";
import { ChangeableSettings, AppSettings } from "../SettingsStoreTypes";
import { DEFAULT_SETTINGS } from "../SettingsStoreConstants";
import stateSlice from "./state.slice";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);
const memoService = new MemoizeService();

function comparableSettings(settings: AppSettings) {
  return ObjectUtils.exclude(settings, "updated", "newUser");
}

export default new StoreBuilder()
  .addSlice(stateSlice)
  .addApi(({ get, set }) => {
    const setHideNotice = (hide: boolean) => set({ hideNotice: hide });

    const computedHasCustomSettings = () => memoService.memoize(
      () => ObjectUtils.isDifferent(
        comparableSettings(get().settings),
        comparableSettings(DEFAULT_SETTINGS),
      ),
      get().settings,
    );

    const computedHasUnsavedChanges = () => {
      const { settings, initialSettings } = get();

      return memoService.memoize(() => {
        const hasUnsavedChanges = ObjectUtils.isDifferent(
          comparableSettings(settings),
          comparableSettings(initialSettings),
        );

        if (hasUnsavedChanges) {
          debugLog("SettingsStore has unsaved changes", {
            current: comparableSettings(settings),
            initial: comparableSettings(initialSettings),
          });
        }

        return hasUnsavedChanges;
      }, settings, initialSettings);
    };

    const computedChangeableSettings = () => {
      const { settings } = get();
      return ObjectUtils.exclude(settings, "newUser", "updated") as ChangeableSettings;
    };

    return {
      setHideNotice,
      get hasCustomSettings() {
        return computedHasCustomSettings();
      },
      get hasUnsavedChanges() {
        return computedHasUnsavedChanges();
      },
      get changeableSettings() {
        return computedChangeableSettings();
      },
    };
  });