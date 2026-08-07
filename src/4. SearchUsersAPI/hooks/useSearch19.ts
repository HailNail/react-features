import { startTransition, useActionState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { searchUsersAction } from '../utils/searchUsersAction';
import useDebounce from '../../hooks/useDebounce';

const useSearch19 = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('search-term', '');
  const [state, runAction, isPending] = useActionState(searchUsersAction, {
    data: [],
    error: null,
  });

  const debouncedTerm = useDebounce(searchTerm);

  useEffect(() => {
    if (!debouncedTerm.trim()) return;
    startTransition(() => {
      runAction(debouncedTerm);
    });
  }, [debouncedTerm, runAction]);

  return { searchTerm, setSearchTerm, state, isPending };
};

export default useSearch19;
