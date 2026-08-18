import { useState } from 'react';
import styles from './styles.module.css';
import ModalReact18 from './ModalReact18';

const AppReact18Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.parentComponent}>
      <h3>Parent container (overflow: hidden)</h3>
      <button onClick={() => setIsOpen(true)}>Open React 18 Modal</button>
      <ModalReact18
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="React Custom Modal"
      >
        <p>This modal escapes parent bounds cleanly via createPortal!</p>
      </ModalReact18>
    </div>
  );
};

export default AppReact18Modal;
