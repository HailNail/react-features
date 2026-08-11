import { useFormStatus } from 'react-dom';
import styles from './LoginComponents.module.css';

interface LoginInputProps {
  type: string;
  name: string;
  label: string;
}

const LoginInput = ({ label, type, name }: LoginInputProps) => {
  const { pending } = useFormStatus();
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} disabled={pending} />
    </div>
  );
};

export default LoginInput;
