import { supabase } from '../lib/supabase';

export async function testReadLikes() {
  const { data, error } = await supabase
    .from('likes')
    .select('*')
    .eq('post_id', 1);

  console.log('likes:', data);
  console.log('error:', error);
}
