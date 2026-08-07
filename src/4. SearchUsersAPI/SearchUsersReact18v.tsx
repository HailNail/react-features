import SpinnerIcon from '../lib/SpinnerIcon';
import useSearch from './hooks/useSearch';

const SearchUsersReact18v = () => {
  const { searchTerm, setSearchTerm, isLoading, error, results } = useSearch();

  return (
    <div>
      <h2>React 18 Search (Debounced value + Abort controller)</h2>
      <input
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />

      {isLoading && <SpinnerIcon />}
      {error && (
        <div style={{ color: 'red', border: '1px solid red' }}>
          Error: {error}
        </div>
      )}

      <ul>
        {results.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsersReact18v;
