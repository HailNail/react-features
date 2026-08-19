import { getPosts } from "../api/posts";
import type { Post } from "../types";

type FeedState = {
  posts: Post[];
  page: number;
  hasMore: boolean;
};

const loadMoreAction = async(currentState : FeedState) => {
const nextPage = currentState.page + 1;
try {
    const newPosts = await getPosts(nextPage);
    return {
        posts: [...currentState.posts, ...newPosts],
        page: nextPage,
        hasMore: newPosts.length === 10
    }
} catch (error) {
    const err = error instanceof Error ? error.message : String(error);
    console.error(err);
    return currentState;
}
}

export default loadMoreAction;