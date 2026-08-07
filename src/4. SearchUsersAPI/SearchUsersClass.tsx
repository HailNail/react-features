import { Component, type ReactNode } from 'react';
import type { State } from '../types/SearchUsersTypes';
import { debounce } from './utils/debounce';
import type { DebouncedFunction } from '../types/DebounceTypes';
import getHttpErrorMessage from '../utils/fetchErrors';
import SpinnerIcon from '../lib/SpinnerIcon';

class SearchUsersClass extends Component<Record<string, never>, State> {
  state: Readonly<State> = {
    query: '',
    results: [],
    isLoading: false,
    error: null,
  };

  latestRequestId = 0;

  debouncedFetchUsers: DebouncedFunction<typeof this.fetchUsers>;

  constructor(props: Record<string, never>) {
    super(props);
    this.debouncedFetchUsers = debounce(this.fetchUsers, 300);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    this.setState({ query });
    this.debouncedFetchUsers(query);
  };

  fetchUsers = async (query: unknown) => {
    if (typeof query === 'string' && !query.trim()) {
      this.setState({ results: [], isLoading: false });
      return;
    }

    const currentRequestId = ++this.latestRequestId;

    this.setState({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(query as string)}`,
      );
      if (!response.ok) {
        const errorMessage = getHttpErrorMessage(response.status);
        throw new Error(errorMessage);
      }

      const data = await response.json();

      if (currentRequestId === this.latestRequestId) {
        this.setState({ results: data, isLoading: false });
      } else {
        console.log(
          `Discarded stale response for request #${currentRequestId}`,
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : String(error);
      if (currentRequestId === this.latestRequestId) {
        this.setState({
          isLoading: false,
          error: errorMessage,
        });
      }
    }
  };

  componentWillUnmount(): void {
    this.debouncedFetchUsers.cancel();
  }

  render(): ReactNode {
    const { results, isLoading, error, query } = this.state;

    return (
      <div>
        <h3>Class Component Search (Request Id Guard)</h3>
        <input
          type="text"
          value={query}
          onChange={this.handleInputChange}
          placeholder="Type for search user..."
        />
        {isLoading && <SpinnerIcon />}
        {error && (
          <div style={{ color: 'red', border: '1px solid red' }}>{error}</div>
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
  }
}

export default SearchUsersClass;
