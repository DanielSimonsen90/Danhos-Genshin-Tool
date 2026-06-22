import { useEffect, useRef } from "react";
import { classNames } from "@/common/functions/strings";
import type { ModalProps } from "./ModalProps";

export default function Modal({ children, onClose, open, ...props }: ModalProps) {
  const { className, interceptClose } = props;
  const hasButtons = props.confirmText || props.cancelText || props.onConfirm || props.onCancel;
  const ref = useRef<HTMLDialogElement>(null);
  const handleClose = interceptClose ?? onClose;

  const onCancel = () => {
    props.onCancel?.();
    onClose();
  };
  const onConfirm = () => {
    props.onConfirm?.();
    onClose();
  };

  useEffect(function handleBackdrop() {
    if (open) (ref.current as any)?.showModal();
    else (ref.current as any)?.close();
  }, [open]);

  useEffect(function handleClose() {
    const dialog = ref.current;
    if (!dialog) return;

    if (interceptClose) {
      const handleCancel = (e: Event) => {
        e.preventDefault();
        interceptClose();
      };
      dialog.addEventListener('cancel', handleCancel);
      return () => dialog.removeEventListener('cancel', handleCancel);
    }

    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, [interceptClose, onClose]);

  return (
    <dialog ref={ref} className={classNames("modal", className)} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={handleClose}>&times;</button>
        {children}
        {hasButtons && (
          <div className="button-panel">
            <button className="tertiary" onClick={onCancel}>{props.cancelText ?? 'Cancel'}</button>
            <button className="brand primary" onClick={onConfirm}>{props.confirmText ?? 'Confirm'}</button>
          </div>
        )}
      </div>
    </dialog>
  );
}