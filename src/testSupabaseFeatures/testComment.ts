import { supabase } from '../lib/supabase';

export async function testComment() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('comments')
    .insert({
      post_id: 1,
      author_id: user!.id,
      content: 'Nice post, Alice!',
    })
    .select()
    .single();

  console.log('comment:', data);
  console.log('error:', error);
}
