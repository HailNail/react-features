import './App.module.css';
import { useAuth } from './hooks/useAuth';
import useLocalStorage from './helperHooks/useLocalStorage';
import SpinnerIcon from './lib/SpinnerIcon';
import Header from './components/Header/Header';
import LoginModal from './pages/Login/LoginModal';

function App() {
  const { user, initializing } = useAuth();
  const [loginOpen, setLoginOpen] = useLocalStorage('modal_open', false);

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
