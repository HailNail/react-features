import type { User } from '@supabase/supabase-js';
import { signOut } from '../../api/auth';
import styles from './Header.module.css';
import { useState } from 'react';
import SpinnerIcon from '../../lib/SpinnerIcon';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
}

const Header = ({ user, onLogin }: HeaderProps) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const handleSignOut = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className={styles.header}>
      <h1>Social Little App</h1>
      {user ? (
        <button onClick={handleSignOut} disabled={loggingOut}>
          {loggingOut ? <SpinnerIcon /> : 'Logout'}
        </button>
      ) : (
        <button onClick={onLogin}>Login</button>
      )}
    </header>
  );
};

export default Header;
