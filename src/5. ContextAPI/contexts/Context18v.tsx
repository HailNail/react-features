import { createContext } from 'react';
import type {
  AuthContextExperimentalType,
  ThemeContextType,
} from '../../types/ContextTypes';

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const AuthContextExperimental =
  createContext<AuthContextExperimentalType | null>(null);
