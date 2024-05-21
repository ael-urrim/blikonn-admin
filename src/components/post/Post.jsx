import "../../main.scss";
import "./post.scss";

import { Link } from "react-router-dom";
import moment from "moment/moment.js";

// Icons
import {
  FaEllipsisH,
  FaRegCommentAlt,
  FaRegEye,
  FaArrowLeft,
  FaRegStar,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
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
import { MdDelete, MdOutlineFileDownload } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";

//Verified badge
import VERIFIED from "../../media/icons/verified.png";
import DEFAULTPIC from "../../media/images/default.jpg";
import GALLERY from "../../media/icons/pic-upload.png";

import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import LazyImage from "../loadingScreens/lazyImage/LazyImage";
import axios from "axios";
//import { jwtDecode } from "jwt-decode";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import soundFile from "../../media/alerts/post-liked.wav";
import postSentNotif from "../../media/alerts/post-sent.mp3";
import ToastNotification from "../toastNotification/ToastNotification";

const Post = ({ post }) => {
  const [picPopup, setPicPopup] = useState(false);
  const togglePicPopup = () => {
    setPicPopup(!picPopup);
  };
  const likedNotification = new Audio(soundFile);
  const { loggedInUser, authToken } = useContext(AuthContext);
  const postId = post.postId;

  const queryClient = useQueryClient();

  // Fetch post likes
  const fetchLikes = async () => {
    try {
      axios.defaults.withCredentials = true;
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
    // isLoading: likesLoading,
    data: likesData,
    //error: likesError,
  } = useQuery({
    queryKey: ["likes", postId],
    queryFn: fetchLikes,
    refetchOnWindowFocus: false,
  });

  // Fetch post comment
  const fetchComments = async () => {
    try {
      axios.defaults.withCredentials = true;
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
    // isLoading: commentsLoading,
    data: commentsData,
    //error: commentsError,
  } = useQuery({
    queryKey: ["commentCount", post.postId],
    queryFn: fetchComments,
    refetchOnWindowFocus: false,
  });

  // Like a post

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
    addLike.mutate({
      postId: postId,
      postAuthor: post.ownerId,
    });
  };

  // Delete likes
  const removeLike = useMutation({
    mutationFn: async (newLike) => {
      axios.defaults.withCredentials = true;
      return await axios.post(
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

  // For post options popup
  const [postOptionsPopUp, setPostOptionsPopUp] = useState({});
  const togglePostOptions = (postId) => {
    setPostOptionsPopUp((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // For post edit modal popup
  const [isLoading, setIsLoading] = useState(false);
  const [editPostImage, setEditPostImage] = useState(null);
  const [postEditText, setPostEditText] = useState("");
  const [openPostEditPopup, setOpenPostEditPopup] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const togglePostEditModal = () => {
    setOpenPostEditPopup(!openPostEditPopup);
    setEditPostImage(null);
  };

  const editPost = useMutation({
    mutationFn: async (postId) => {
      setIsLoading(true);
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/posts/editPosts`,
        postId,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      setOpenPostEditPopup(false);
      sentNotification.play();
      setSuccess("Post updated Successfully");
      setIsLoading(false);
      // Clear Form and Close form only on successful response
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    },
    onError: (error) => {
      setError("An error occurred. Pls try again!");
      setTimeout(() => {
        setError(false);
      }, 5000);
      //setIsLoading(false);
      // Handle error cases here
      console.error(error);
      // You can show error messages or take appropriate actions
    },
  });

  const updatePost = async (e, oldPostText, postId, oldPostImage) => {
    e.preventDefault();

    let imgUrl = "";
    if (editPostImage) {
      try {
        const formData = new FormData();
        formData.append("postImage", editPostImage);
        const res = await axios.post(
          `${process.env.REACT_APP_URL}/postImage/upload`,
          formData
        );
        imgUrl = res.data;
      } catch (error) {
        console.log("Error processing image:", error);
      }
    }

    editPost.mutate({
      postEditText: postEditText ? postEditText : oldPostText,
      postEditImage: imgUrl ? imgUrl : oldPostImage,
      postId: postId,
    });
  };

  // Delete post
  const removePost = useMutation({
    mutationFn: async (deletePostId) => {
      axios.defaults.withCredentials = true;
      return await axios.delete(
        `${process.env.REACT_APP_URL}/posts/deletePost/${postId}`,
        deletePostId,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("posts");
    },
  });

  const deletePost = async (postId) => {
    removePost.mutate({ postId: postId });
  };

  // Post sharing popup
  const [openPostSharePopup, setOpenPostSharePopup] = useState(false);
  const togglePostShareModal = () => {
    setOpenPostSharePopup(!openPostSharePopup);
  };
  //const [quoteImage, setQuoteImage] = useState(null);
  const [quoteText, setQuoteText] = useState("");
  const sentNotification = new Audio(postSentNotif);
  const resetForm = () => {
    //setQuoteImage(null);
    setQuoteText("");
  };

  // Share a post
  const ShareAPost = useMutation({
    mutationFn: async (newPostShare) => {
      axios.defaults.withCredentials = true;
      return await axios.post(
        `${process.env.REACT_APP_URL}/posts/sharePosts`,
        newPostShare,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
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

    ShareAPost.mutate({
      postId: post.postId,
      quoteText: quoteText,
    });
  };

  // Copy text to clipboard
  const [copyLink, setCopyLink] = useState(false);
  const copyPostLink = async () => {
    const text = `${process.env.REACT_APP_CLIENT_URL}/post/${post.postId}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyLink("Link to post copied to clipboard!");
      setTimeout(() => {
        setCopyLink(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
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
    <>
      {copyLink && <ToastNotification message={copyLink} />}
      {success && <ToastNotification message={success} />}
      {error && <ToastNotification message={error} />}
      <div className="posts-card">
        {picPopup && (
          <div className="pic-popup">
            <div className="left">
              <div className="top">
                <div
                  className="top-left"
                  onClick={() => togglePicPopup(post.postId)}
                >
                  <FaArrowLeft className="icon" title="Back" />
                </div>
                <div className="top-right">
                  <MdOutlineFileDownload className="icon" title="Download" />
                </div>
              </div>
              <div className="bottom">
                <img
                  src={`${process.env.REACT_APP_URL}/images/posts/${post.postImage}`}
                  alt=""
                />
                <div className="time">{moment(post.date).fromNow()}</div>
                <p>{post.postText ? post.postText : ""}</p>
              </div>
            </div>
            <div className="right">
              <div className="top-right">
                <img
                  src={`${process.env.REACT_APP_URL}/images/users/${post.userImage}`}
                  alt=""
                />
                <div className="right-userDetails">
                  <div className="name">
                    {post.fullName ? post.fullName : ""}
                  </div>
                  <div className="time">{moment(post.date).fromNow()}</div>
                </div>
              </div>

              <div className="bottom-right">
                <p>{post.postText ? post.postText : ""}</p>
              </div>
            </div>
          </div>
        )}
        <div className="home-post">
          {/* {post.type && post.sharerId && (
          <div className="sharerDetails">
            <div className="sharerDetailsLeft">
              {post.userImage ? (
                <img
                  src={`${process.env.REACT_APP_URL}/images/users/${post.userImage}`}
                  alt="user-image"
                />
              ) : (
                <img src={DEFAULTPIC} alt="" />
              )}
            </div>

            <div className="sharerDetailsRight">
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
              </div>
            </div>
          </div>
        )} */}

          <div className="shared">
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
                        <div onClick={copyPostLink} className="links">
                          <BsLink45Deg />
                          Copy link
                        </div>

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
                            marginBottom: "5px",
                          }}
                          onClick={handleToggleExpansion}
                        >
                          See More
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="post-img" onClick={togglePicPopup}>
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
                      <BsHeartFill
                        className="icon"
                        style={{ color: "#df0404" }}
                      />
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
                {/* <div onClick={togglePostShareModal} className="link">
                  <div className="shares post-reactions" title="Share">
                    <RiArrowLeftRightFill className="icon" />
                    <p>{post.shares ? post.shares : 0}</p>
                  </div>
                </div> */}
                <div className="link">
                  <div className="gift post-reactions" title="Gift">
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

        {/* Edit posts */}

        {openPostEditPopup && (
          <div className="input-popup">
            <div className="input-card">
              <span className="popup-top">
                <p>Edit post</p>
                <AiOutlineClose
                  className="close-btn"
                  onClick={togglePostEditModal}
                />
              </span>
              <form encType="multipart/form-data">
                <div className="input-field">
                  <textarea
                    name="postText"
                    id=""
                    cols="30"
                    rows="5"
                    defaultValue={post.postText}
                    onChange={(e) => setPostEditText(e.target.value)}
                  />
                  {post.postImage || editPostImage ? (
                    <img
                      className="editImage"
                      alt=""
                      src={
                        editPostImage instanceof Blob
                          ? URL.createObjectURL(editPostImage)
                          : `${process.env.REACT_APP_URL}/images/posts/${post.postImage}`
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="bottom">
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
                        onChange={(e) => setEditPostImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                  {isLoading ? (
                    <button disabled>Please wait...</button>
                  ) : (
                    <button
                      type="submit"
                      onClick={(e) =>
                        updatePost(
                          e,
                          post.postText,
                          post.postId,
                          post.postImage
                        )
                      }
                    >
                      Update Post
                    </button>
                  )}
                </div>
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
                        <div className="time">
                          {moment(post.date).fromNow()}
                        </div>
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
                    {/* <label htmlFor="add-img">
                    <img src={GALLERY} alt="" title="Add Image" />
                  </label>
                  <input
                    type="file"
                    name="postImage"
                    id="add-img"
                    style={{ display: "none" }}
                    onChange={(e) => setQuoteImage(e.target.files[0])}
                  /> */}
                    {/* <label htmlFor="add-img">
                    {quoteImage && (
                      <img
                        className="file"
                        alt=""
                        src={URL.createObjectURL(quoteImage)}
                      />
                    )}
                  </label> */}
                  </div>

                  <button onClick={sharePost}>Share Post</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
