import { Component, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

class ModalClass extends Component<Props> {
  el: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount(): void {
    const modalRoot = document.querySelector('#modal-root') || document.body;
    modalRoot.appendChild(this.el);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount(): void {
    const modalRoot = document.querySelector('#modal-root') || document.body;
    modalRoot.removeChild(this.el);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.props.isOpen) {
      this.props.onClose();
    }
  };

  render(): ReactNode {
    const { isOpen, onClose, children } = this.props;

    if (!isOpen) return null;

    return createPortal(
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeBtn} onClick={onClose}>
            X
          </button>
          {children}
        </div>
      </div>,
      this.el,
    );
  }
}

export default ModalClass;
