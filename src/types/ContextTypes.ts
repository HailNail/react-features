import type { Dispatch, SetStateAction } from 'react';

export interface AuthContextExperimentalType {
  user: { name: string; role: string } | null;
  setUser: Dispatch<SetStateAction<{ name: string; role: string }>>;
}

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}
