import { useState } from 'react';
import UserListFetchReact18v from './3. FetchingAPIData/UserListFetchReact18v';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <>
      <div>
        <h3>Test deploy in vercel!</h3>
        <p>{count}</p>
        <button onClick={handleClick}>Click</button>
        <UserListFetchReact18v />
      </div>
    </>
  );
}

export default App;
