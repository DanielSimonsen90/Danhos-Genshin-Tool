import Modal, { ModalConsumerProps } from '@/components/common/Modal';

type Props = Pick<ModalConsumerProps, 'open'> & {
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
};

export default function PendingChangesModal({ open, onSave, onDiscard, onCancel }: Props) {
  return (
    <Modal open={open} onClose={onCancel} className="pending-changes-modal">
      <h2>Unsaved changes</h2>
      <p>You have unsaved changes. What would you like to do?</p>
      <div className="button-panel">
        <button type="button" className="tertiary" onClick={onCancel}>Keep editing</button>
        <button type="reset" className="danger secondary" onClick={onDiscard}>Discard</button>
        <button type="submit" className="brand primary" onClick={onSave}>Save</button>
      </div>
    </Modal>
  );
}
