import { supabase } from '../lib/supabase';

export async function testGetPosts() {
  const { data, error } = await supabase.from('posts').select('*');

  console.log('posts:', data);
  console.log('error:', error);
}
