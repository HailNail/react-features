import { useEffect, useRef, type ReactNode, type SyntheticEvent } from "react";
import styles from "./Modal.module.css"

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
     disableClose?: boolean;
    children: ReactNode
}

const Modal = ({isOpen, onClose, disableClose, children} : ModalProps) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (isOpen) {
            if (!dialog.open) dialog.showModal();
        } else {
            if (dialog.open) dialog.close();
        }
    }, [isOpen]);

    const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
    if (disableClose) {
      e.preventDefault();
    } else {
      onClose();
    }
  };

    return (
        <dialog className={styles.nativeModal} onClose={disableClose ? undefined : onClose}  onCancel={handleCancel} ref={dialogRef}>
             <button onClick={onClose} aria-label="Close" disabled={disableClose}>
          X
        </button>
         {children}
        </dialog>
    )
};

export default Modal;