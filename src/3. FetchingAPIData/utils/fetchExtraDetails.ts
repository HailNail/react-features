import type { DetailedUser } from '../../types/UserTypes';

export const fetchExtraDetails = async (
  userId: number,
): Promise<DetailedUser> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  return await res.json();
};
