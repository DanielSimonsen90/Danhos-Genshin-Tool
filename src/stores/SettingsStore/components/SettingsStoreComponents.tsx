import { classNames } from "@/common/functions/strings";

type Props = {
  showNotice: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onClose: () => void;
};

export const SaveSettingsNotice = ({ showNotice, onSave, onDiscard, onClose }: Props) => (
  <div className={classNames("settings-notice", !showNotice && 'hidden')}>
    <button onClick={onClose} className="button close">&times;</button>
    <p>You have <span>unsaved changes</span> to your settings. Save them?</p>
    <div className="button-panel">
      <button onClick={onSave} className="button primary success">Save changes</button>
      <button onClick={onDiscard} className="button secondary">Discard changes</button>
    </div>
  </div>
);