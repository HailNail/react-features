import { Suspense } from 'react';
import ErrorBoundary from '../utils/ErrorBoundary';
import UserList from './components/UserList';
import { usersPromise } from './utils/usersPromise';
import SpinnerIcon from '../lib/SpinnerIcon';

const UserListFetchReact19v = () => {
  return (
    <div>
      <h2>User List (React 19 'use()' API)</h2>
      <ErrorBoundary>
        <Suspense fallback={<SpinnerIcon />}>
          <UserList usersPromise={usersPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default UserListFetchReact19v;
