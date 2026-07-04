import { ReactNode } from 'react';
import Modal from '@/components/common/Modal';
import { classNames } from '@/common/functions/strings';

export type ConfirmAction = {
  label: string;
  onClick: () => void;
  className?: string;
};

type Props = {
  className?: string;
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  message: string;
  actions: ConfirmAction[];
};

export default function ConfirmModal({ className, open, onClose, title, message, actions }: Props) {
  return (
    <Modal open={open} onClose={onClose} className={classNames('confirm-modal', className)}>
      {title && <h2>{title}</h2>}
      <p>{message}</p>
      <div className="button-panel">
        {actions.map(({ label, onClick, className }) => (
          <button key={label} type="button" className={className} onClick={onClick}>
            {label}
          </button>
        ))}
      </div>
    </Modal>
  );
}
