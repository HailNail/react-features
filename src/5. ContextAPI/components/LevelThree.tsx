import { ThemeContext } from '../contexts/Context18v';
import useAnyContext from '../hooks/useAnyContext';

const LevelThree = () => {
  /*   const { } = useAnyContext(AuthContextExperimental, 'useAuth'); */
  const { theme } = useAnyContext(ThemeContext, 'useTheme');
  const divStyle = {
    backgroundColor: theme === 'light' ? '#fff' : '#000',
    color: theme === 'light' ? '#000' : '#fff',
    padding: '15px',
  };
  return (
    <div style={divStyle}>
      {/*   <h3>User profile</h3>
      <p>Name: {user?.name}</p>
      <p>Name: {user?.role}</p>
      <p>{theme} mode</p>
      <button onClick={toggleTheme}>Switch theme</button>
      <button onClick={() => testAuth()}>Login</button>
      <button onClick={() => testCreatePost()}>Create post</button>
      <button onClick={() => testGetUser()}>Get user</button>
      <button onClick={() => testGetPosts()}>Get Posts</button>
      <button onClick={() => testComment()}>Create comment</button>
      <button onClick={() => testLike()}>Like post</button>
      <button onClick={() => testReadComments()}>Show comments</button>
      <button onClick={() => testReadLikes()}>Show likes</button> */}
    </div>
  );
};

export default LevelThree;
