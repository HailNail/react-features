import { useContext } from 'react';

const useAnyContext = <T>(
  context: React.Context<T | null>,
  hookName: string = 'useContext',
): T => {
  const value = useContext(context);
  if (!value)
    throw new Error(`${hookName} must be used within Provider wrapper`);
  return value;
};

export default useAnyContext;
