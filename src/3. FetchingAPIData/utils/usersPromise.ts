import type { User } from '../../types/UserTypes';
import getHttpErrorMessage from '../../utils/fetchErrors';

const fetchUsersPromise = async (): Promise<User[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    const errorMessage = getHttpErrorMessage(res.status);
    throw new Error(errorMessage);
  }
  return await res.json();
};

export const usersPromise = fetchUsersPromise();
