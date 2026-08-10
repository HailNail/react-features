import { AuthContext, ThemeContext } from '../contexts/Context18v';
import useAnyContext from '../hooks/useAnyContext';

const LevelThree = () => {
  const { user } = useAnyContext(AuthContext, 'useAuth');
  const { theme, toggleTheme } = useAnyContext(ThemeContext, 'useTheme');
  const divStyle = {
    backgroundColor: theme === 'light' ? '#fff' : '#000',
    color: theme === 'light' ? '#000' : '#fff',
    padding: '15px',
  };
  return (
    <div style={divStyle}>
      <h3>User profile</h3>
      <p>Name: {user?.name}</p>
      <p>Name: {user?.role}</p>
      <p>{theme} mode</p>
      <button onClick={toggleTheme}>Switch theme</button>
    </div>
  );
};

export default LevelThree;
