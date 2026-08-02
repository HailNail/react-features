import { useState } from 'react';
import useFilterList from './hooks/useFilterListWithPagination';
import BigUserList from './components/BigUserList';

const UserListFilter18v = () => {
  const {
    inputValue,
    handleSearchChange,
    page,
    setPage,
    paginatedUsers,
    totalPages,
  } = useFilterList();
  const displayedUsers = paginatedUsers.slice(0, 50);
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>User directory</h2>
      <p>Child count {count}</p>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        Click
      </button>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search by name and role..."
        value={inputValue}
        onChange={handleSearchChange}
      />
      <BigUserList users={displayedUsers} />

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserListFilter18v;
