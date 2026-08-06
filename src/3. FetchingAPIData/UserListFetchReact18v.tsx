import useFilterList from '../2. FilteringList/hooks/useFilterList';
import type { User } from '../types/UserTypes';
import useFetchReact18v from './hooks/useFetchReact18v';

const UserListFetchReact18v = () => {
  const { data, error, isLoading } = useFetchReact18v();
  const { inputValue, handleSearchChange, filteredItems } = useFilterList<User>(
    data || [],
    ['name', 'email'],
  );

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div style={{ color: 'red' }}>Something went wrong: {error}</div>;

  return (
    <div>
      <h2>User List (React 18 with AbortController)</h2>
      <input
        type="text"
        placeholder="Type for searching..."
        value={inputValue}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredItems.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserListFetchReact18v;
