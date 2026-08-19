// components/LoginComponents/LoginForm.tsx
import { useActionState, useEffect } from 'react';
import { loginAction } from '../../actions/auth';
import LoginInput from './LoginInput';
import LoginButton from './LoginButton';
import styles from './LoginComponents.module.css'; 

type LoginFormProps = {
  onSuccess: () => void;
   onLoadingChange?: (isLoading: boolean) => void;
};

const LoginForm = ({ onSuccess, onLoadingChange }: LoginFormProps) => {
  const [state, action, isPending] = useActionState(loginAction, {
    error: null,
    success: false,
  });

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  useEffect(() => {
    if (!state.error && state.success) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <form action={action} className={styles.form}>
      <h2>Sign In</h2>
      <LoginInput label="Email:" type="text" name="email" />
      <LoginInput label="Password:" type="password" name="password" />
      <LoginButton />
      {state.error && <p className={styles.error}>Error: {state.error}</p>}
    </form>
  );
};

export default LoginForm;
