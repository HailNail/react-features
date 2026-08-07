import SpinnerIcon from '../lib/SpinnerIcon';
import useSearch19 from './hooks/useSearch19';

const SearchUsersReact19v = () => {
  const { searchTerm, setSearchTerm, state, isPending } = useSearch19();

  return (
    <div>
      <h2>React 19 Search (useActionState)</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      {isPending && <SpinnerIcon />}
      {state.error && (
        <div style={{ color: 'red', border: '1px solid red' }}>
          Error: {state.error}
        </div>
      )}

      <ul style={{ opacity: isPending ? 0.6 : 1, transition: 'opacity 0.2s' }}>
        {state.data.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUsersReact19v;
