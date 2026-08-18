import { Component, type ReactNode } from 'react';
import styles from './styles.module.css';
import ModalClass from './ModalClass';

class AppClassModal extends Component {
  state: Readonly<{ isModalOpen: boolean }> = { isModalOpen: false };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render(): ReactNode {
    return (
      <div className={styles.parentComponent}>
        <h3>Parent Component (overflow: hidden)</h3>
        <button onClick={this.openModal}>Open Legacy Class Modal</button>
        <ModalClass onClose={this.closeModal} isOpen={this.state.isModalOpen}>
          <h2>Class Modal Header</h2>
          <p>
            This modal was rendered using lifecycle methods and createProtal
          </p>
        </ModalClass>
      </div>
    );
  }
}

export default AppClassModal;
