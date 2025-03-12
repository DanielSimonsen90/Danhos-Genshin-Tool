import { useMemo } from "react";
import { classNames } from "@/common/functions/strings";
import { useSettingsStore } from "../../SettingsStore";

export const SaveSettingsNotice = () => {
  const {
    initialSettings, hasUnsavedChanges, 
    hideNotice, setHideNotice,
    saveSettings, updateSettings
  } = useSettingsStore();
  const showNotice = useMemo(() => !hideNotice && hasUnsavedChanges, [hideNotice, hasUnsavedChanges]);

  function onSave() {
    if (!hasUnsavedChanges) return console.log('No changes to save');
    saveSettings();
  }
  function onDiscard() {
    updateSettings(initialSettings);
  }
  function onClose() {
    setHideNotice(true);
  }

  return (
    <div className={classNames("settings-notice", !showNotice && 'hidden')}>
      <button onClick={onClose} className="button close">&times;</button>
      <p>You have <span>unsaved changes</span> to your settings. Save them?</p>
      <div className="button-panel">
        <button onClick={onDiscard} className="secondary">Discard changes</button>
        <button onClick={onSave} className="primary success">Save changes</button>
      </div>
    </div>
  );
}