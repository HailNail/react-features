import { createContext } from 'react';
import type {
  AuthContextType,
  ThemeContextType,
} from '../../types/ContextTypes';

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const AuthContext = createContext<AuthContextType | null>(null);
