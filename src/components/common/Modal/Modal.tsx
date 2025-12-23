import { useEffect, useRef } from "react";
import { classNames } from "@/common/functions/strings";
import type { ModalProps } from "./ModalProps";

export default function Modal({ children, onClose, open, ...props }: ModalProps) {
  const { className } = props;
  const hasButtons = props.confirmText || props.cancelText || props.onConfirm || props.onCancel;
  const ref = useRef<HTMLDialogElement>(null);

  const onCancel = () => {
    props.onCancel?.();
    onClose();
  };
  const onConfirm = () => {
    props.onConfirm?.();
    onClose();
  };

  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  useEffect(() => {
    if (ref.current && onClose) ref.current.addEventListener('close', onClose);
    
    return () => {
      ref.current && onClose && ref.current.removeEventListener('close', onClose);
    };
  }, [onClose]);

  return (
    <dialog ref={ref} className={classNames("modal", className)} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>&times;</button>
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