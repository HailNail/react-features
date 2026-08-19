import { supabase } from '../lib/supabase';
import type { Post } from '../types';

const PAGE_SIZE = 10;

export const getPosts = async (page: number): Promise<Post[]> => {
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  return data.map((post) => ({
    id: post.id,
    authorId: post.author_id,
    content: post.content,
    imageUrl: post.image_url,
    createdAt: post.created_at,
  }));
};

export const createPost = async (
  content: string,
  imageUrl: string | null = null,
): Promise<Post> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('You must be logged in to create a post');
  }

  const { data, error } = await supabase
    .from('posts')
    .insert({
      author_id: user.id,
      content,
      image_url: imageUrl,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    authorId: data.author_id,
    content: data.content,
    imageUrl: data.image_url,
    createdAt: data.created_at,
  };
};
