import { supabase } from '../lib/supabase';

export async function testReadComments() {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', 1);

  console.log('comments:', data);
  console.log('error:', error);
}
