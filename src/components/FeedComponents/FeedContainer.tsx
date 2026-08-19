import { Suspense, use } from "react";
import type { Post } from "../../types";
import FeedList from "./FeedList";
import ErrorBoundary from "../../utils/ErrorBoundary";
import SpinnerIcon from "../../lib/SpinnerIcon";

type FeedContainerProps = {
  initialPostsPromise: Promise<Post[]>;
};

const FeedContainer = ({initialPostsPromise} : FeedContainerProps) => {
    const initialPosts = use(initialPostsPromise);

 return (
    <ErrorBoundary>
        <Suspense fallback={<SpinnerIcon />}>
        <FeedList initialPosts={initialPosts} />
        </Suspense>
    </ErrorBoundary>
    )
};

export default FeedContainer;