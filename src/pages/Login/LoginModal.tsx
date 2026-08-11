import { useActionState, useEffect, useRef } from 'react';
import useOnClickOutside from '../../helperHooks/useOnClickOutside';
import styles from './LoginModal.module.css';
import { loginAction } from '../../actions/auth';
import LoginInput from '../../components/LoginComponents/LoginInput';
import LoginButton from '../../components/LoginComponents/LoginButton';

type LoginModalProps = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [state, action, isPending] = useActionState(loginAction, {
    error: null,
    success: false,
  });
  const modalContentRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalContentRef, isPending ? () => {} : onClose);
  useEffect(() => {
    if (!state.error && state.success) {
      onClose();
    }
  }, [state, onClose]);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} ref={modalContentRef}>
        <button onClick={onClose} aria-label="Close" disabled={isPending}>
          X
        </button>
        <h2>Sign In</h2>
        <form action={action} className={styles.form}>
          <LoginInput label="Email:" type="text" name="email" />
          <LoginInput label="Password:" type="password" name="password" />
          <LoginButton />
          {state.error && <p>Error: {state.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
