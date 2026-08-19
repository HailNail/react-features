import { getPosts } from "../../api/posts";
import FeedContainer from "../../components/FeedComponents/FeedContainer";

const initialPostsPromise = getPosts(0);
const Feed = () => {
    return (
        <FeedContainer initialPostsPromise={initialPostsPromise} />
    )
};

export default Feed;