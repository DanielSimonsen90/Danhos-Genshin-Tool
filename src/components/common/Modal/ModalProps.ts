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

  /**
   * When provided, all close triggers (X button, backdrop, Escape key) call this
   * instead of onClose. The dialog is prevented from natively closing on Escape
   * so the caller controls whether/when to actually close via the open prop.
   */
  interceptClose?: () => void;
};

export type ModalConsumerProps = Omit<ModalProps, 'children'>