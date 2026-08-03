import { Component, type ReactNode } from 'react';
import getHttpErrorMessage from '../utils/fetchErrors';
import type { User } from '../types/UserTypes';
import SpinnerIcon from '../lib/SpinnerIcon';

class UserListFetchClass extends Component {
  state: Readonly<{
    users: User[];
    error: string | null;
    isLoading: boolean;
  }> = {
    users: [],
    error: null,
    isLoading: false,
  };

  async componentDidMount(): Promise<void> {
    try {
      this.setState({
        isLoading: true,
      });
      const response = await fetch(
        'https://json-placeholder.mock.beeceptor.com/users',
      );
      if (!response.ok) {
        const errorMessage = getHttpErrorMessage(response.status);
        throw new Error(errorMessage);
      } else {
        const data = await response.json();
        this.setState({
          users: data,
          error: null,
          isLoading: false,
        });
      }
    } catch (err: unknown) {
      const knownError =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
            ? err
            : String(err);
      this.setState({
        error: knownError,
        isLoading: false,
      });
    }
  }

  render(): ReactNode {
    const { users, error, isLoading } = this.state;

    if (isLoading) {
      return <SpinnerIcon />;
    }

    if (error) {
      return <span style={{ color: 'red' }}>Error: {error}</span>;
    }

    return (
      <div>
        <h3>User List (Class Component)</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserListFetchClass;
