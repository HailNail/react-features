import { useState } from 'react';

const useCounter = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount((prev) => prev + 1);
  };

  const decrease = () => {
    setCount((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    setCount(0);
  };

  return { count, increase, decrease, reset };
};

export default useCounter;
