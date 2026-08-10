import Layout18v from './5. ContextAPI/components/Layout18v';
import LevelOne from './5. ContextAPI/components/LevelOne18v';
import './App.css';

function App() {
  return (
    <>
      <div>
        {/*   <h3>Test deploy in vercel!</h3>
        <p>{count}</p>
        <button onClick={handleClick}>Click</button> */}
        <Layout18v>
          <LevelOne />
        </Layout18v>
      </div>
    </>
  );
}

export default App;
