import './App.module.css';
import { useAuth } from './hooks/useAuth';
import SpinnerIcon from './lib/SpinnerIcon';
import Header from './components/Header/Header';
import { useEffect } from 'react';
import { getPosts } from './api/posts';

function App() {
  const { user, initializing } = useAuth();

  useEffect(() => {
    getPosts()
      .then((posts) => console.log(posts))
      .catch((error) => console.error(error));
  }, []);

  if (initializing) {
    return <SpinnerIcon />;
  }

  return (
    <>
      <Header user={user} />
      {/* <Feed user={user} /> */}
    </>
  );
}

export default App;
