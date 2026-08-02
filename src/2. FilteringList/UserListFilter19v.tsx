import { ITEMS_PER_PAGE } from '../constants/PAGES';
import SpinnerIcon from '../lib/SpinnerIcon';
import useFilterListV19 from './hooks/useFilterListV19';

const UserListFilter19v = () => {
  const {
    filteredList,
    page,
    setPage,
    handleSearchChange,
    isPending,
    paginatedUsers,
  } = useFilterListV19();

  return (
    <div style={{ position: 'relative' }}>
      <h2>React 19 concurrent filtering</h2>
      <input
        type="text"
        placeholder="Type for search..."
        onChange={handleSearchChange}
      />
      <div style={{ position: 'relative', marginTop: '16px' }}>
        {isPending && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              color: 'hsl(228, 97%, 42%)',
            }}
          >
            <SpinnerIcon /> {/* Ваша иконка или SVG */}
          </div>
        )}
        <p>Matches found: {filteredList.length}</p>

        <ul
          className="list"
          style={{
            opacity: isPending ? 0.4 : 1,
            filter: isPending ? 'blur(1px)' : 'none',
            transition: 'opacity 0.2s ease, filter 0.2s ease',
            pointerEvents: isPending ? 'none' : 'auto',
          }}
        >
          {paginatedUsers.map((user) => (
            <li key={user.id}>
              {user.name} - {user.role}
            </li>
          ))}
        </ul>
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>Page: {page}</span>
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page <= Math.ceil(filteredList.length / ITEMS_PER_PAGE)}
        >
          Prev
        </button>
      </div>
    </div>
  );
};

export default UserListFilter19v;
