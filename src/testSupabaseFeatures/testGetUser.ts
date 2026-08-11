import { supabase } from '../lib/supabase';

export async function testGetUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('Current user:', user);
}
