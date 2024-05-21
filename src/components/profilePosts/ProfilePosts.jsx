import "../../main.scss";
import "./profilePosts.scss";

import { makeRequest } from "../../axios";
import ProfilePost from "../profilePost/ProfilePost";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileLoading from "../loadingScreens/Profile/ProfileLoading";
import PostsLoading from "../loadingScreens/Posts/PostsLoading";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const ProfilePosts = () => {
  const { authToken } = useContext(AuthContext);
  const userId = useLocation().pathname.split("/")[2];
  const [posts, setPosts] = useState([]);

  //console.log(posts)

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const cancelToken = axios.CancelToken.source();

    const fetchProfilePosts = async () => {
      axios.defaults.withCredentials = true;
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/posts/userPost/${userId}`,
          {
            cancelToken: cancelToken.token,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setPosts(res.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled!");
        } else {
          console.error("Error fetching posts:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfilePosts();

    return () => {
      cancelToken.cancel();
    };
  }, [userId]);

  return isLoading ? (
    <>
      {/* <PostsLoading /> */}
      <ProfileLoading />
    </>
  ) : (
    <>
      {posts.length > 0 ? (
        posts.map((post) => <ProfilePost post={post} key={post.postId} />)
      ) : (
        <p className="no-posts">No Posts</p>
      )}
    </>
  );
};

export default ProfilePosts;
