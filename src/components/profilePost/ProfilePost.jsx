import "../../main.scss";
import "./profilePost.scss";

import { Link } from "react-router-dom";
import moment from "moment/moment.js";

// Icons
import {
  FaEllipsisH,
  FaRegCommentAlt,
  FaRegEye,
  FaRegStar,
} from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
//import { RiArrowLeftRightFill } from "react-icons/ri";

//Verified badge
import VERIFIED from "../../media/icons/verified.png";
import DEFAULTPIC from "../../media/images/default.jpg";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import soundFile from "../../media/alerts/post-liked.wav";
import { AuthContext } from "../../context/authContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";

const ProfilePost = ({ post }) => {
  const { loggedInUser, authToken } = useContext(AuthContext);
  const postId = post.postId;

  const queryClient = useQueryClient();

  // Fetch post likes
  const fetchLikes = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/likes/getLikes/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching likes:", error);
      throw new Error(error.message);
    }
  };

  const {
    isLoading: likesLoading,
    data: likesData,
    error: likesError,
  } = useQuery({
    queryKey: ["likes", postId],
    queryFn: fetchLikes,
  });

  // Fetch post comment
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/comments/getAllComments/${post.postId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error(error.message);
    }
  };

  const {
    isLoading: commentsLoading,
    data: commentsData,
    error: commentsError,
  } = useQuery({
    queryKey: ["commentCount", post.postId],
    queryFn: fetchComments,
  });

  // Like a post
  const likedNotification = new Audio(soundFile);
  const addLike = useMutation({
    mutationFn: async (newLike) => {
      axios.defaults.withCredentials = true;
      return await axios.post(
        `${process.env.REACT_APP_URL}/likes/likePosts/${postId}`,
        newLike,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["likes"] });
      likedNotification.play();
    },
  });

  const likePost = async () => {
    addLike.mutate({ postId: postId, postAuthor: post.ownerId });
  };

  // Delete likes
  const removeLike = useMutation({
    mutationFn: async (newLike) => {
      axios.defaults.withCredentials = true;
      return await axios.delete(
        `${process.env.REACT_APP_URL}/likes/unlikePosts/${postId}`,
        newLike,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });
  const unlikePost = async () => {
    removeLike.mutate({ postId: postId });
  };

  //Truncate text feature
  const textRef = useRef(null); //Ref to hold text element
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = () => {
    setIsExpanded(true);
  };

  const handlePostClick = (e) => {
    if (e.target === textRef.current) {
      setIsExpanded(false); // Shorten the text on post text click
    }
  };

  const getTruncatedText = () => {
    const lines = post.postText.split("\n");
    if (lines.length <= 3) {
      return post.postText;
    }

    return lines.slice(0, 3).join("\n");
  };

  return (
    <div className="posts-card">
      <div className="profile-post">
        {/* Left side */}
        <div className="left">
          {post.userImage ? (
            <img
              src={`${process.env.REACT_APP_URL}/images/users/${post.userImage}`}
              alt=""
            />
          ) : (
            <img src={DEFAULTPIC} alt="" />
          )}
        </div>

        {/* Right side */}
        <div className="right">
          <div className="upper">
            <div className="user-info">
              <div className="name">
                <div className="display-name">
                  <div className="link">
                    {post.fullName ? post.fullName : post.username}
                  </div>
                  {/* If user is verified, show verification badge */}
                  {post.verified === 1 ? <img src={VERIFIED} alt="" /> : ""}
                </div>
                <div className="time">{moment(post.date).fromNow()}</div>
              </div>
              <div className="options">
                <FaEllipsisH className="icon" />
              </div>
            </div>
          </div>
          <div className="middle">
            <div ref={textRef} onClick={handlePostClick}>
              {isExpanded ? (
                <p ref={textRef} className="post-text">
                  {post.postText ? post.postText : ""}
                </p>
              ) : (
                <div>
                  <p className="post-text">{getTruncatedText()}</p>
                  {post.postText.split("\n").length > 3 && (
                    <span
                      className="post-text"
                      style={{
                        fontFamily: "calibri",
                        textDecoration: "underline",
                      }}
                      onClick={handleToggleExpansion}
                    >
                      See More
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="post-img">
              {/* If post doesn't have an image, show the image, else pass */}
              {post.postImage ? (
                <img
                  src={`${process.env.REACT_APP_URL}/images/posts/${post.postImage}`}
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="bottom">
            {likesData?.includes(loggedInUser.userId) ? (
              <div className="link" title="Like" onClick={unlikePost}>
                <div className="likes post-reactions">
                  <BsHeartFill className="icon" style={{ color: "#df0404" }} />
                  <p>{likesData?.length}</p>
                </div>
              </div>
            ) : (
              <div className="link" title="Like" onClick={likePost}>
                <div className="likes post-reactions">
                  <BsHeart className="icon" />
                  <p>{likesData?.length}</p>
                </div>
              </div>
            )}
            <Link to={`/post/${post.postId}`} className="link">
              <div className="comments post-reactions" title="Comment">
                <FaRegCommentAlt className="icon" />
                <p>{commentsData?.length}</p>
              </div>
            </Link>
            {/* <Link to={`/share-post/${post.postId}`} className="link">
              <div className="shares post-reactions" title="Share">
                <RiArrowLeftRightFill className="icon" />
                <p>{post.shares ? post.shares : 0}</p>
              </div>
            </Link> */}
            <div className="link">
              <div className="Gift post-reactions" title="Gift">
                <FaRegStar className="icon" />
                <p>5</p>
              </div>
            </div>
            <div className="link">
              <div className="views post-reactions" title="Views">
                <FaRegEye className="icon" />
                <p>{post.views ? post.views : 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
