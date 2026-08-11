import { supabase } from '../lib/supabase';

export async function testAuth() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'alice@test.com',
    password: 'something123',
  });

  console.log('user:', data.user);
  console.log('error:', error);
}
