import { useEffect, useState, type PropsWithChildren } from 'react';
import { supabase } from '../../lib/supabase';
import { AuthContext } from '../AuthContext';
import type { User } from '@supabase/supabase-js';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setInitializing(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext value={{ user, initializing }}>{children}</AuthContext>;
};
