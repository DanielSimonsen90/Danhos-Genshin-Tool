import { ReactNode } from 'react';
import Modal from '@/components/common/Modal';

export type ConfirmAction = {
  label: string;
  onClick: () => void;
  className?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  message: ReactNode;
  actions: ConfirmAction[];
};

export default function ConfirmModal({ open, onClose, title, message, actions }: Props) {
  return (
    <Modal open={open} onClose={onClose} className="confirm-modal">
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
