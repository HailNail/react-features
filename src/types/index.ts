export type LoginState = {
  error: string | null;
  success: boolean;
};

export type Post = {
  id: string;
  authorId: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
};

export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
};

export type Like = {
  id: string;
  postId: string;
  userId: string;
};
