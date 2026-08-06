import { useEffect, useState } from 'react';
import type { User } from '../../types/UserTypes';
import getHttpErrorMessage from '../../utils/fetchErrors';

const useFetchReact18v = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          'https://json-placeholder.mock.beeceptor.com/users',
          {
            signal,
          },
        );
        if (!response.ok) {
          const errorMessage = getHttpErrorMessage(response.status);
          throw new Error(errorMessage);
        }

        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        const err =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : String(error);
        if (error instanceof Error && error.name === 'AbortError') return;
        setError(err);
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
};

export default useFetchReact18v;
