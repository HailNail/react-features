import { useState } from 'react';
import Modal from '../Modal/Modal';
import LoginForm from './LoginForm';


type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      disableClose={isSubmitting}
    >
      <LoginForm 
        onSuccess={onClose} 
        onLoadingChange={setIsSubmitting} 
      />
    </Modal>
  );
};

export default LoginModal;
