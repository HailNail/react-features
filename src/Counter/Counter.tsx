import useCounter from './hooks/useCounter';

const Counter = () => {
  const { count, increase, decrease, reset } = useCounter();

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  );
};

export default Counter;
