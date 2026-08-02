import { useState } from 'react';
import './App.css';
import UserListFilter19v from './2. FilteringList/UserListFilter19v';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <h3>Test deploy in vercel!</h3>
        <button onClick={handleClick}>click {count}</button>
        <UserListFilter19v />
      </div>
    </>
  );
}

export default App;
