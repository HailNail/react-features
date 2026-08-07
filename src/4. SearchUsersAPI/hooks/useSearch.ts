import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useLocalStorage from '../../hooks/useLocalStorage';
import getHttpErrorMessage from '../../utils/fetchErrors';
import type { User } from '../../types/UserTypes';

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('search-term', '');
  const debouncedTerm = useDebounce(searchTerm);

  const [results, setResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!debouncedTerm.trim()) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    async function performSearch() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(debouncedTerm)}`,
          { signal },
        );
        if (!response.ok) {
          const errorMessage = getHttpErrorMessage(response.status);
          throw new Error(errorMessage);
        }

        const data = await response.json();

        setResults(data);
        setIsLoading(false);
      } catch (error) {
        const errMessage =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : String(error);
        if (error instanceof Error && error.name === 'AbortError') {
          console.log(`Fetch aborted for query "${debouncedTerm}"`);
        } else {
          setError(errMessage);
          setIsLoading(false);
        }
      }
    }
    performSearch();

    return () => {
      controller.abort();
    };
  }, [debouncedTerm]);

  const updateSearchTerm = (newValue: string) => {
    setSearchTerm(newValue);
    if (!newValue.trim()) {
      setResults([]);
      setIsLoading(false);
      setError(null);
    }
  };

  return {
    searchTerm,
    setSearchTerm: updateSearchTerm,
    isLoading,
    results,
    error,
  };
};

export default useSearch;
