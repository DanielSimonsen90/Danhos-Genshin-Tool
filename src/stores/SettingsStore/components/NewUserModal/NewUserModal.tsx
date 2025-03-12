import { DebugLog } from "@/common/functions/dev";
import Modal from "@/components/common/Modal";
import { useActionState } from "@/hooks/useActionState";
import { useRegionStore, RegionSettings, DEFAULT_REGION_DATA } from "@/stores/RegionStore";

import { useSettingsStore } from "../../SettingsStore";
import SettingsOption from "../SettingsModal/SettingsOption";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

type NewUserData = (
  & Pick<RegionSettings, 'traveler' | 'region'>
);

export const NewUserModal = () => {
  const SettingsStore = useSettingsStore();
  const RegionStore = useRegionStore();
  const newUser = SettingsStore.getSetting('newUser');
  const [submitting, onSubmit] = useActionState<NewUserData>(data => {
    delete data._form;
    _onSubmit(data);
  });

  debugLog('NewUserModal render', {
    setting: newUser,
    store: SettingsStore,
  });

  function _onSubmit(data: NewUserData) {
    debugLog('NewUserModal submitted', data);

    RegionStore.setRegionData({ ...data, selected: true });
    SettingsStore.updateAndSaveSettings(state => {
      const update = { ...state };
      delete update.newUser;
      return update;
    }, true);
  }

  return newUser ? (
    <Modal className="new-user-modal" open={newUser} onClose={() => !submitting && _onSubmit(DEFAULT_REGION_DATA)}>
      <form onSubmit={onSubmit}>
        <h1>You wake up from a deep sleep on a beach in Monstadt...</h1>
        <div className="intro-sentence">
          <span>You wake up as </span>
          <SettingsOption setting="traveler" value={DEFAULT_REGION_DATA['traveler']} />
          <span> in </span>
          <SettingsOption setting="region" value={DEFAULT_REGION_DATA['region']} />
        </div>
        <input type="submit" value="Finish" disabled={submitting} />
      </form>
    </Modal>
  ) : null;
};
