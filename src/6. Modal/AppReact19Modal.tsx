import { useState } from 'react';
import styles from './styles.module.css';
import ModalReact19 from './ModalReact19';

const AppReact19Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.parentComponent}>
      <h3>Parent Container</h3>
      <button onClick={() => setIsOpen(true)}>
        Open React 19 Native Dialog Modal
      </button>
      <ModalReact19
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="React 19 Native Dialog Modal"
      >
        <p>No createPortal required! Rendered into native browser top layer</p>
      </ModalReact19>
    </div>
  );
};

export default AppReact19Modal;
