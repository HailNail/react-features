import { useFormStatus } from 'react-dom';
import SpinnerIcon from '../../lib/SpinnerIcon';
import styles from './LoginComponents.module.css';

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className={styles.button}>
      {pending ? <SpinnerIcon /> : 'Sign In'}
    </button>
  );
};

export default LoginButton;
