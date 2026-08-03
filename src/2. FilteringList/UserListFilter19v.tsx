import { ITEMS_PER_PAGE } from '../constants/PAGES';
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
        <p>Matches found: {filteredList.length}</p>
        <ul
          className="list"
          style={{
            opacity: isPending ? 0.4 : 1,
            transition: 'opacity 0.2s ease',
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
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= Math.ceil(filteredList.length / ITEMS_PER_PAGE)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserListFilter19v;
