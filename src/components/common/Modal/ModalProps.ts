import { ReactNode } from "react";

export type ModalProps = {
  children: ReactNode;

  open: boolean;
  onClose: () => void;

  className?: string;
  
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  onCancel?: () => void;
};

export type ModalConsumerProps = Omit<ModalProps, 'children'>