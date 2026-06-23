import ConfirmModal from '@/providers/ConfirmProvider/components/ConfirmModal';
import type { ModalConsumerProps } from '@/components/common/Modal';

type Props = Pick<ModalConsumerProps, 'open'> & {
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
};

export default function PendingChangesModal({ open, onSave, onDiscard, onCancel }: Props) {
  return (
    <ConfirmModal
      open={open}
      onClose={onCancel}
      title="Unsaved changes"
      message="You have unsaved changes. What would you like to do?"
      actions={[
        { label: 'Keep editing', onClick: onCancel, className: 'tertiary' },
        { label: 'Discard', onClick: onDiscard, className: 'danger secondary' },
        { label: 'Save', onClick: onSave, className: 'brand primary' },
      ]}
    />
  );
}
