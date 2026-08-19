import type { User } from '@supabase/supabase-js';
import { signOut } from '../../api/auth';
import styles from './Header.module.css';
import { useState } from 'react';
import SpinnerIcon from '../../lib/SpinnerIcon';
import useLocalStorage from '../../helperHooks/useLocalStorage';
import LoginModal from '../../pages/Login/LoginModal';

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const [loggingOut, setLoggingOut] = useState(false);
    const [loginOpen, setLoginOpen] = useLocalStorage('modal_open', false);
  
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
        <button onClick={() => setLoginOpen(true)}>Login</button>
      )}

       <LoginModal 
          isOpen={loginOpen} 
          onClose={() => setLoginOpen(false)} 
        />
    </header>
  );
};

export default Header;
