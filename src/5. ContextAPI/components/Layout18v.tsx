import { useState } from 'react';
import { AuthContext, ThemeContext } from '../contexts/Context18v';

const Layout18v = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState({ name: 'Alex', role: 'Admin' });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Layout18v;
