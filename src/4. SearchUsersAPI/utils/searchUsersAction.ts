import type { State19v } from '../../types/SearchUsersTypes';
import type { User } from '../../types/UserTypes';
import getHttpErrorMessage from '../../utils/fetchErrors';

export async function searchUsersAction(
  previousState: State19v,
  query: string,
) {
  if (!query || !query.trim()) {
    return { data: [], error: null };
  }

  try {
    const url = new URL('https://jsonplaceholder.typicode.com/users');
    url.searchParams.append('q', query);

    const response = await fetch(url);
    if (!response.ok) {
      const errorMessage = getHttpErrorMessage(response.status);
      throw new Error(errorMessage);
    }

    const data: User[] = await response.json();

    return { data, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : String(error);
    return { data: previousState.data, error: errorMessage };
  }
}
