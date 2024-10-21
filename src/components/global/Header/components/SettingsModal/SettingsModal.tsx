import { DOMAIN_NAME } from '@/common/constants/domain';
import { DebugLog } from "@/common/functions/dev";

import Modal, { ModalConsumerProps } from "@/components/common/Modal";
import { useActionState } from "@/hooks/useActionState";

import { useSettingsStore } from "@/stores/SettingsStore";
import { Settings } from "@/stores/SettingsStore/SettingsStoreTypes";

import SettingsOption from "./SettingsOption";

const debugLog = DebugLog(DebugLog.DEBUGS.settingsModal);

export default function SettingsModal(props: ModalConsumerProps) {
  const { settings, resetSettings, updateAndSaveSettings, hasCustomSettings } = useSettingsStore();
  const [submitting, onSubmit] = useActionState<Settings>(data => {
    delete data._form;
    debugLog('Settings update recieved', data);
    updateAndSaveSettings(data);
    props.onClose();
  })

  const onReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (confirm('Are you sure you want to reset settings?')) {
      resetSettings();
      props.onClose();
    }
  };

  return props.open ? (
    <Modal {...props} className="settings-modal" onClose={props.onClose}>
      <h1>{DOMAIN_NAME} Settings</h1>
      <p>Here are list of settings, you can change to better your experience.</p>
      <form onSubmit={onSubmit}>
        {Object.entries(settings).map(([key, value]) => (
          <SettingsOption key={key} setting={key as keyof typeof settings} value={value} />
        ))}

        <div className="button-panel">
          {hasCustomSettings && <button type="reset" className="danger secondary" disabled={submitting} onClick={onReset}>Reset settings</button>}
          <button type="submit" className="brand primary" disabled={submitting}>Save settings</button>
        </div>
      </form>
    </Modal>
  ) : null;
}