import { DebugLog } from "@/common/functions/dev";
import Modal from "@/components/common/Modal";
import { useActionState } from "@/hooks/useActionState";
import { useAccountStore, AccountSettings, DEFAULT_ACCOUNT_DATA } from "@/stores/AccountStore";

import { useSettingsStore } from "../../SettingsStore";
import SettingsOption from "../SettingsModal/components/SettingsOption/SettingsOption";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsStore);

type NewUserData = (
  & Pick<AccountSettings, 'traveler' | 'worldRegion'>
);

export const NewUserModal = () => {
  const SettingsStore = useSettingsStore();
  const AccountStore = useAccountStore();
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

    AccountStore.setAccountData({ ...data, selected: true });
    SettingsStore.updateAndSaveSettings(state => {
      const update = { ...state };
      delete update.newUser;
      return update;
    }, true);
  }

  return newUser ? (
    <Modal className="new-user-modal" open={newUser} onClose={() => !submitting && _onSubmit(DEFAULT_ACCOUNT_DATA)}>
      <form onSubmit={onSubmit}>
        <h1>You wake up from a deep sleep on a beach in Monstadt...</h1>
        <div className="intro-sentence">
          <span>You wake up as </span>
          <SettingsOption hideLabel setting="traveler" value={DEFAULT_ACCOUNT_DATA['traveler']} accountNames={undefined} />
          <span> in </span>
          <SettingsOption hideLabel setting="worldRegion" value={DEFAULT_ACCOUNT_DATA['worldRegion']} />
        </div>
        <input type="submit" value="Finish" disabled={submitting} />
      </form>
    </Modal>
  ) : null;
};
