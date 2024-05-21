import "./notifications.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Notifications = () => {
  document.title = "Blikonn - Notifications";
  const { loggedInUser, authToken } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const userId = useLocation().pathname.split("/")[2];
  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/notifications/getNotifications/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const {
    isLoading,
    data: notifications,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  //console.log(notifications);
  const markAsRead = useMutation({
    mutationFn: async (markRead) => {
      axios.defaults.withCredentials = true;
      return await axios.post(
        `${process.env.REACT_APP_URL}/notifications/markRead/`,
        markRead,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notifCount"] });
    },

    onError: (error) => {
      console.log(error.response);
    },
  });

  const markRead = async () => {
    markAsRead.mutate({ userId: loggedInUser.userId });
  };

  const notifSeen = useMutation({
    mutationFn: async ({ actionReceiver, type }) => {
      axios.defaults.withCredentials = true;
      return await axios.post(
        `${process.env.REACT_APP_URL}/notifications/markNotifRead/`,
        { actionReceiver, type },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    },
    onSuccess: (data, { actionReceiver }) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notifCount"] });
      navigate(`/post/${actionReceiver}`);
    },

    onError: (error) => {
      console.log(error.response);
    },
  });

  const markNotifRead = async (actionReceiver, type) => {
    notifSeen.mutate({ actionReceiver, type });
  };

  return (
    <div className="notifications">
      <div className="notifications-card">
        <div className="notif-top">
          <div className="title">Notifications</div>
          <div className="notif-settings">
            <p onClick={markRead}>Mark all as read</p>
            <Link to={`/settings/${userId}`} className="link">
              <AiFillSetting className="icons" />
            </Link>
          </div>
        </div>
        <hr />
        <div className="notif-body">
          {notifications?.length > 0 ? (
            notifications?.map((notifContent) =>
              // if notification type is a follow
              notifContent.type === "follow" ? (
                <Link
                  //to={`/profile/${notifContent.notifSender}`}
                  className={` link notifContent ${
                    notifContent.seen === 0 ? "modebg" : "modebgtr"
                  }`}
                >
                  <Link
                    to={`/profile/${notifContent.notifSender}`}
                    className="link"
                  >
                    {notifContent.fullName
                      ? notifContent.fullName
                      : notifContent.username}
                  </Link>{" "}
                  <span
                    onClick={() =>
                      markNotifRead(
                        notifContent.actionReceiver,
                        notifContent.type
                      )
                    }
                  >
                    started following you {moment(notifContent.date).fromNow()}
                  </span>
                </Link>
              ) : // if notification type is a comment
              notifContent.type === "comment" ? (
                <div
                  //to={`/post/${notifContent.actionReceiver}`}
                  className={` link notifContent ${
                    notifContent.seen === 0 ? "modebg" : "modebgtr"
                  }`}
                >
                  <Link
                    to={`/profile/${notifContent.notifSender}`}
                    className="link"
                  >
                    {notifContent.fullName
                      ? notifContent.fullName
                      : notifContent.username}
                  </Link>
                  <span
                    onClick={() =>
                      markNotifRead(
                        notifContent.actionReceiver,
                        notifContent.type
                      )
                    }
                  >
                    {" "}
                    commented on your {notifContent.actionContent}{" "}
                    {moment(notifContent.date).fromNow()}
                  </span>
                </div>
              ) : // if notification type is a like
              notifContent.type === "liked" ? (
                <div
                  key={notifContent.userId}
                  //to={`/post/${notifContent.actionReceiver}`}
                  className={` link notifContent ${
                    notifContent.seen === 0 ? "modebg" : "modebgtr"
                  }`}
                >
                  <Link
                    to={`/profile/${notifContent.notifSender}`}
                    className="link"
                  >
                    {notifContent.fullName
                      ? notifContent.fullName
                      : notifContent.username}
                  </Link>{" "}
                  <span
                    onClick={() =>
                      markNotifRead(
                        notifContent.actionReceiver,
                        notifContent.type
                      )
                    }
                  >
                    liked your {notifContent.actionContent}{" "}
                    {moment(notifContent.date).fromNow()}
                  </span>
                </div>
              ) : null
            )
          ) : (
            <p> You have no notifications yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
