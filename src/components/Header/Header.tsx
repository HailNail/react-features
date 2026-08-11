import type { User } from '@supabase/supabase-js';
import { signOut } from '../../api/auth';
import styles from './Header.module.css';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
}

const Header = ({ user, onLogin }: HeaderProps) => {
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className={styles.header}>
      <h1>Social Little App</h1>
      {user ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <button onClick={onLogin}>Login</button>
      )}
    </header>
  );
};

export default Header;
