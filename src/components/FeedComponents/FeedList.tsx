import { startTransition, useActionState } from "react";
import type { Post } from "../../types";
import loadMoreAction from "../../actions/posts";
import SpinnerIcon from "../../lib/SpinnerIcon";

const FeedList = ({ initialPosts }: { initialPosts: Post[] }) => {
        const [state, loadMore, isPending] = useActionState(loadMoreAction, {posts: initialPosts, page: 0, hasMore: true});

    return (
        <main>
            {state.posts.map((post) => (
                <article key={post.id} style={{height: "100px", border: "1px solid blue"}}>
                    <p>{post.content}</p>
                </article>
            ))}

            {state.hasMore && (
                <button onClick={() => startTransition(loadMore)} disabled={isPending}>{isPending ? <SpinnerIcon/> : "Show more"}</button>
            )}
        </main>
    )
};

export default FeedList;