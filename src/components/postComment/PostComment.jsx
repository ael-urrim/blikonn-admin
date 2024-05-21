import "./postComment.scss";

// Icons
import {
  FaEllipsisH,
  FaRegCommentAlt,
  FaRegEye,
  FaReplyAll,
} from "react-icons/fa";

import {
  BsHeart,
  BsHeartFill,
  BsFillFlagFill,
  BsLink45Deg,
  BsEyeSlashFill,
  BsPenFill,
} from "react-icons/bs";

import { BiCurrentLocation, BiBlock } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose, AiFillNotification } from "react-icons/ai";
import { RiArrowLeftRightFill } from "react-icons/ri";

import GALLERY from "../../media/icons/pic-upload.png";

import DEFAULTPIC from "../../media/images/default.jpg";

import { Link } from "react-router-dom";

//Verified badge
import VERIFIED from "../../media/icons/verified.png";

import { useState, useEffect, useContext } from "react";

import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
//import soundFile from "../../media/alerts/post-liked.wav";
import axios from "axios";
import LazyImage from "../loadingScreens/lazyImage/LazyImage";

const PostComment = ({ post }) => {
  const { loggedInUser, userDetails } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // For comment options popup
  const [commentOptionsPopUp, setCommentOptionsPopUp] = useState({});
  const toggleCommentOptions = (commentId) => {
    setCommentOptionsPopUp((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Get post comments
  const [postComments, setPostComments] = useState([]);
  const fetchcomments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/comments/getPostComments/${post.postId}`
      );

      return res.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error(error.message);
    }
  };

  //console.log(posts)
  const { isLoading, data, error } = useQuery({
    queryKey: ["comments", post.postId],
    queryFn: fetchcomments,
  });

  return isLoading ? (
    "Fetching comments..."
  ) : (
    <div className="post-comment">
      {data?.length > 0 ? (
        data?.map((comments) => (
          <div className="comments" key={comments.commentId}>
            {/* Left side */}
            <div className="comments-left">
              {comments.userImage ? (
                <img src={`${process.env.REACT_APP_URL}/images/users/${comments.userImage}`} alt="" />
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
                      <Link
                        to={`/profile/${comments.commentAuthor}`}
                        className="link"
                      >
                        {comments.fullName
                          ? comments.fullName
                          : comments.username}
                      </Link>
                      {comments.verified ? <img src={VERIFIED} alt="" /> : ""}
                    </div>
                    <div className="time">
                      {moment(comments.datePosted).fromNow()}
                    </div>
                  </div>
                  <div
                    className="options"
                    onClick={() => toggleCommentOptions(comments.commentId)}
                  >
                    <FaEllipsisH className="icon" />

                    {commentOptionsPopUp[comments.commentId] && (
                      <div className="options-popup">
                        {loggedInUser.userId === comments.commentAuthor && (
                          <Link
                            to={`/delete-comment/${comments.commentId}`}
                            className="links"
                          >
                            <MdDelete />
                            Delete Comment
                          </Link>
                        )}
                        {loggedInUser.userId === comments.commentAuthor && (
                          <Link
                            to={`/edit-comment/${comments.commentId}`}
                            className="links"
                          >
                            <BsPenFill />
                            Edit Comment
                          </Link>
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
                <div className="comment-text">{comments.commentText}</div>
                <div className="comment-img">
                  {comments.commentImage ? (
                    <LazyImage
                    id={post.postId}
                    src={`${process.env.REACT_APP_URL}/images/posts/${comments.commentImage}`}
                    key={post.postId}
                  />
                    
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="bottom">
                <div className="reaction" title="Like">
                  <Link to="/post-like/1" className="link">
                    <BsHeart className="icon" />
                    500
                  </Link>
                </div>
                <div className="reaction" title="Like">
                  <div
                    className="link"
                    title="Comment"
                    //onClick={toggleModal}
                  >
                    <FaReplyAll className="icon" />
                    100
                  </div>
                </div>
                <div className="reaction" title="Share">
                  <Link to="/share-post/1" className="link">
                    <RiArrowLeftRightFill className="icon" />
                    150
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-comments">Be the first to comment</p>
      )}
    </div>
  );
};

export default PostComment;
