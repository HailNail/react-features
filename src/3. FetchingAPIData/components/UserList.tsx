import { Fragment, use } from 'react';
import type { User } from '../../types/UserTypes';
import useFilterList from '../../2. FilteringList/hooks/useFilterList';
import UserCard from './UserCard';

const UserList = ({ usersPromise }: { usersPromise: Promise<User[]> }) => {
  const users = use(usersPromise);
  const { inputValue, handleSearchChange, filteredItems } = useFilterList(
    users,
    ['name'],
  );

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleSearchChange}
        placeholder="Type for search users..."
      />
      <ul>
        {filteredItems.map((user) => (
          <Fragment key={user.id}>
            <li>
              {user.name} - {user.email}
            </li>
            <UserCard userId={user.id} />
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
