import { supabase } from '../lib/supabase';

export async function testCreatePost() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User is not authenticated');
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({
      author_id: user.id,
      content: 'Hello from Alice ✌',
    })
    .select()
    .single();

  console.log('post:', data);
  console.log('error:', error);
}
