import './App.module.css';
import { useAuth } from './hooks/useAuth';
import SpinnerIcon from './lib/SpinnerIcon';
import Feed from './pages/Feed/Feed';
import Header from './pages/Header/Header';

function App() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <SpinnerIcon />;
  }

  return (
    <>
      <Header user={user} />
      <Feed />
    </>
  );
}

export default App;
