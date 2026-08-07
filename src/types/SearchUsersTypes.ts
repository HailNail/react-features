import type { User } from './UserTypes';

export interface State {
  query: string;
  results: User[];
  isLoading: boolean;
  error: string | null;
}

export interface State19v {
  data: User[];
  error: string | null;
}
