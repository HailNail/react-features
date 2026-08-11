import './App.module.css';
import { useAuth } from './hooks/useAuth';
import useLocalStorage from './helperHooks/useLocalStorage';
import SpinnerIcon from './lib/SpinnerIcon';
import Header from './components/Header/Header';
import LoginModal from './pages/Login/LoginModal';
import { useEffect } from 'react';
import { getPosts } from './api/posts';

function App() {
  const { user, initializing } = useAuth();
  const [loginOpen, setLoginOpen] = useLocalStorage('modal_open', false);

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
      <Header user={user} onLogin={() => setLoginOpen(true)} />
      {/* <Feed user={user} /> */}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
}

export default App;
