import { classNames } from "@/common/functions/strings";
import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  
  open: boolean;
  onClose: () => void;

  className?: string;
};

export default function Modal({ children, onClose, open, ...props }: Props) {
  const { className } = props;
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) (ref.current as any)?.showModal();
    else (ref.current as any)?.close();
  }, [open]);

  useEffect(() => {
    if (ref.current && onClose) ref.current.addEventListener('close', onClose);
    return () => ref.current && onClose && ref.current.removeEventListener('close', onClose);
  }, [onClose]);

  return (
    <dialog ref={ref} className={classNames("modal", className)} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </dialog>
  );
}