import "./postsLoading.scss";

const PostsLoading = () => {
  const COUNTER = 8;
  return Array(COUNTER).fill(
    <div className="postsLoading">
      {/* Left side */}
      <div className="postsLoading-left">
        <div className="postsLoading-left-img"></div>
      </div>

      {/* Right side */}
      <div className="postsLoading-right">
        <div className="postsLoading-right-upper">
          <div className="postsLoading-right-upper-name"></div>
          <div className="postsLoading-right-upper-time"></div>
          <div className="postsLoading-right-upper-text"></div>
          <div className="postsLoading-right-upper-img"></div>
        </div>

        <div className="postsLoading-right-bottom">
          <div className="likes post-reactions" title="Like"></div>
          <div className="comments post-reactions" title="Comment"></div>
          <div className="shares post-reactions" title="Share"></div>
          <div className="views post-reactions" title="Views"></div>
        </div>
      </div>
    </div>
  );
};

export default PostsLoading;
