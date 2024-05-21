import "../../main.scss";
import "./sharePost.scss";

import { Link } from "react-router-dom";
import moment from "moment/moment.js";

// Icons
import { FaEllipsisH, FaRegCommentAlt, FaRegEye } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
//import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  BsFillFlagFill,
  BsLink45Deg,
  BsEyeSlashFill,
  BsPenFill,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";

//Verified badge
import VERIFIED from "../../media/icons/verified.png";
import DEFAULTPIC from "../../media/images/default.jpg";
import GALLERY from "../../media/icons/pic-upload.png";

import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import LazyImage from "../loadingScreens/lazyImage/LazyImage";
import axios from "axios";
//import { jwtDecode } from "jwt-decode";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import soundFile from "../../media/alerts/post-liked.wav";
import postSentNotif from "../../media/alerts/post-sent.mp3";

const SharePost = ({ post }) => {
  const { loggedInUser } = useContext(AuthContext);
  const postId = post.postId;
  const postOwner = post.ownerId;
  const queryClient = useQueryClient();

  // Fetch post likes
  const fetchLikes = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/likes/getLikes/${postId}`
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
        `${process.env.REACT_APP_URL}/comments/getAllComments/${post.postId}`
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
        newLike
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
        newLike
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

  // //Get likes
  // const [liked, setLiked] = useState();
  // console.log(liked);
  // useEffect(() => {
  //   const cancelToken = axios.CancelToken.source();
  //   const fetchLikes = async () => {
  //     axios.defaults.withCredentials = true;
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_URL}/likes/getLikerId/${postId}`,
  //         {
  //           cancelToken: cancelToken.token,
  //         }
  //       );
  //       setLiked(res.data[0]);
  //     } catch (error) {
  //       if (axios.isCancel(error)) {
  //         console.log("Request Cancelled!");
  //       } else {
  //         console.error("Error fetching posts:", error);
  //       }
  //     }
  //   };
  //   fetchLikes();
  //   return () => {
  //     cancelToken.cancel();
  //   };
  // }, [postId]);

  // For post options popup
  const [postOptionsPopUp, setPostOptionsPopUp] = useState({});
  const togglePostOptions = (postId) => {
    setPostOptionsPopUp((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  //Add new posts
  const [postImage, setPostImage] = useState(null);
  const [postText, setPostText] = useState("");
  const [editError, setEditError] = useState("");

  // For post edit modal popup
  const [openPostEditPopup, setOpenPostEditPopup] = useState(false);
  const togglePostEditModal = () => {
    setOpenPostEditPopup(!openPostEditPopup);
  };

  const uploads = async () => {
    try {
      const formData = new FormData();
      formData.append("postImage", postImage);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const editPost = async (e) => {
    e.preventDefault();

    try {
      let imgUrl = "";
      if (postImage) imgUrl = await uploads();
      const postData = {
        postText: postText,
        postImage: imgUrl,
      };

      const res = await makeRequest.post("/posts/addPosts", postData);
      console.log(res.data);
      setOpenPostEditPopup(!openPostEditPopup);
      window.location.reload();
      //setSuccess()
    } catch (error) {
      console.log(setEditError(error.response.data.Message));
      setOpenPostEditPopup(!openPostEditPopup);
    }
  };

  // Delete post
  const deletePost = async (e) => {
    e.preventDefault();
    try {
      await makeRequest.delete(`/posts/deletePost/${post.postId}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Post sharing popup
  const [openPostSharePopup, setOpenPostSharePopup] = useState(false);
  const togglePostShareModal = () => {
    setOpenPostSharePopup(!openPostSharePopup);
  };
  const [quoteImage, setQuoteImage] = useState(null);
  const [quoteText, setQuoteText] = useState("");
  const sentNotification = new Audio(postSentNotif);
  const resetForm = () => {
    setQuoteImage(null);
    setQuoteText("");
  };

  const ShareAPost = useMutation({
    mutationFn: async (newPostShare) => {
      axios.defaults.withCredentials = true;
      return await axios.post(
        `${process.env.REACT_APP_URL}/posts/sharePosts`,
        newPostShare
      );
    },

    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      // Invalidate and refetch
      setOpenPostSharePopup(false);
      sentNotification.play();
      resetForm();
      // Clear Form and Close form only on successful response
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const sharePost = async (e) => {
    e.preventDefault();
    //console.log(quoteText);
    let imgUrl = "";
    if (quoteImage) {
      try {
        const formData = new FormData();
        formData.append("postImage", quoteImage);
        const res = await axios.post(
          `${process.env.REACT_APP_URL}/postImage/upload`,
          formData
        );
        imgUrl = res.data;
      } catch (error) {
        console.log("Error processing image:", error);
      }
    }

    ShareAPost.mutate({
      postId: post.postId,
      quoteText: quoteText,
      quoteImage: imgUrl,
      postOwner: post.ownerId,
    });
  };

  return (
    <div className="posts-card">
      <div className="home-post">
        {/* Left side */}
        <div className="left">
          {post.userImage ? (
            <img
              src={`${process.env.REACT_APP_URL}/images/users/${post.userImage}`}
              alt="user-image"
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
                  <Link to={`/profile/${post.ownerId}`} className="link">
                    {post.fullName ? post.fullName : post.username}
                  </Link>
                  {post.verified === 1 ? <img src={VERIFIED} alt="" /> : ""}
                </div>
                <div className="time">{moment(post.date).fromNow()}</div>
              </div>

              {/* Post options */}
              <div
                className="post-options"
                onClick={() => togglePostOptions(post.postId)}
              >
                <FaEllipsisH className="icon" />
                {postOptionsPopUp[post.postId] && (
                  <div className="post-options-popup">
                    {loggedInUser.userId === post.ownerId && (
                      <div className="links" onClick={deletePost}>
                        <MdDelete />
                        Delete post
                      </div>
                    )}
                    {loggedInUser.userId === post.ownerId && (
                      <div className="links" onClick={togglePostEditModal}>
                        <BsPenFill />
                        Edit post
                      </div>
                    )}
                    <Link to="/" className="links">
                      <BsLink45Deg />
                      Copy link
                    </Link>

                    <Link to="/" className="links">
                      <BsFillFlagFill /> Report post
                    </Link>

                    <Link to="/" className="links">
                      <BiBlock />
                      Block this user
                    </Link>

                    <Link to="/" className="links">
                      <AiFillNotification /> Turn on notifictaion
                    </Link>

                    <Link to="/" className="links">
                      <BsEyeSlashFill />
                      Stop seeing posts like this
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="middle">
            <div className="post-text">
              {post.postText ? post.postText : ""}
            </div>
            <div className="post-img">
              {post.postImage ? (
                <LazyImage
                  id={post.postId}
                  src={`${process.env.REACT_APP_URL}/images/posts/${post.postImage}`}
                  key={post.postId}
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
            <div onClick={togglePostShareModal} className="link">
              <div className="shares post-reactions" title="Share">
                <RiArrowLeftRightFill className="icon" />
                <p>{post.shares ? post.shares : 0}</p>
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

      {/* Edit posts */}

      {openPostEditPopup && (
        <div className="input-popup">
          <div className="input-card">
            <AiOutlineClose
              className="close-btn"
              onClick={togglePostEditModal}
            />
            <p>Edit post</p>
            <form encType="multipart/form-data">
              <div className="input-field">
                <textarea
                  name="postText"
                  id=""
                  cols="30"
                  rows="15"
                  defaultValue={post.postText}
                  onChange={(e) => setPostText(e.target.value)}
                />
              </div>
              <div className="image-field">
                <div className="upload-img">
                  <label htmlFor="add-img">
                    <img src={GALLERY} alt="" title="Add Image" />
                  </label>
                  <input
                    type="file"
                    name="postImage"
                    id="add-img"
                    style={{ display: "none" }}
                    onChange={(e) => setPostImage(e.target.files[0])}
                  />
                  <label htmlFor="add-img">
                    <img
                      src={"./uploads/" + post.postImage}
                      alt=""
                      title="Add Image"
                    />
                  </label>
                </div>
                <div className="add-location">
                  <BiCurrentLocation title="Add location" />
                </div>
              </div>
              <button type="submit" onClick={editPost}>
                Update Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================== Share Post =========================================== */}

      {openPostSharePopup && (
        <div className="share-popup">
          <div className="share-card">
            <AiOutlineClose
              className="close-btn"
              onClick={() => [setOpenPostSharePopup(false), resetForm()]}
            />
            <p>Share post</p>
            <form encType="multipart/form-data">
              <div className="input-field">
                <textarea
                  name="postText"
                  id=""
                  cols="20"
                  rows="2"
                  defaultValue={quoteText}
                  placeholder="Type something..."
                  onChange={(e) => setQuoteText(e.target.value)}
                />
              </div>
              <div
                className="postToShare"
                style={{
                  height: post.postImage ? "200px" : "max-xontent",
                }}
              >
                <div className="top">
                  <div className="left">
                    {post.userImage ? (
                      <img
                        src={`${process.env.REACT_APP_URL}/images/users/${post.userImage}`}
                        alt="user-image"
                      />
                    ) : (
                      <img src={DEFAULTPIC} alt="" />
                    )}
                  </div>

                  <div className="right">
                    <div className="name">
                      <div className="display-name">
                        <p>{post.fullName ? post.fullName : post.username}</p>
                        {post.verified === 1 ? (
                          <span>
                            <img src={VERIFIED} alt="" />
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="time">{moment(post.date).fromNow()}</div>
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="post-text">
                    {post.postText ? post.postText : ""}
                  </div>
                  <div className="post-img">
                    {post.postImage ? (
                      <LazyImage
                        id={post.postId}
                        src={`${process.env.REACT_APP_URL}/images/posts/${post.postImage}`}
                        key={post.postId}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="image-field">
                <div className="upload-img">
                  <label htmlFor="add-img">
                    <img src={GALLERY} alt="" title="Add Image" />
                  </label>
                  <input
                    type="file"
                    name="postImage"
                    id="add-img"
                    style={{ display: "none" }}
                    onChange={(e) => setQuoteImage(e.target.files[0])}
                  />
                  <label htmlFor="add-img">
                    {quoteImage && (
                      <img
                        className="file"
                        alt=""
                        src={URL.createObjectURL(quoteImage)}
                      />
                    )}
                  </label>
                </div>

                <button onClick={sharePost}>Share Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePost;
