import type { User } from '@supabase/supabase-js';
import { createContext } from 'react';

type AuthContextValue = {
  user: User | null;
  initializing: boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
