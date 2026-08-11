import { supabase } from '../lib/supabase';

export async function testLike() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('likes')
    .insert({
      post_id: 1,
      user_id: user!.id,
    })
    .select();

  console.log('like:', data);
  console.log('error:', error);
}
