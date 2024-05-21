import { Link } from "react-router-dom";
import "../../main.scss";
import "./leftbar.scss";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import DEFAULTPIC from "../../media/images/default.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import axios from "axios";

const Leftbar = () => {
  const { loggedInUser, userDetails, authToken } = useContext(AuthContext);
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    axios.defaults.withCredentials = true;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/users/allUser/`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
          },
        }
      );
      setSuggested(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="leftbar">
      {/* Card One */}
      <div className="card-one">
        <div className="home-link">
          <Link to="/" className="link">
            <FaHome className="icons" /> Home
          </Link>
        </div>
        <div className="interactions-link">
          <Link to={`/interactions/${loggedInUser.userId}`} className="link">
            <FaUserFriends className="icons" /> Interactions
          </Link>
        </div>
        <div className="notifications-link">
          <Link to={`/notifications/${loggedInUser.userId}`} className="link">
            <MdNotifications className="icons" /> Notifications
          </Link>
        </div>
      </div>

      {/* Card Two */}
      <div className="card-two">
        <div className="user-img">
          {userDetails.userImage ? (
            <img
              src={`${process.env.REACT_APP_URL}/images/users/${userDetails.userImage}`}
              alt=""
            />
          ) : (
            // <img src={signedInUserId.profilePic} alt="" />
            <img src={DEFAULTPIC} alt="" />
          )}
        </div>
        <div className="user-details">
          <div className="name">
            <Link to={`/profile/${loggedInUser.userId}`} className="link">
              {userDetails.fullName
                ? userDetails.fullName
                : userDetails.username}
            </Link>
          </div>
          <div className="description">CEO, Yurrim</div>
        </div>
      </div>

      {/* Card Three */}
      <div className="card-three">
        <p>Suggested Accounts</p>
        {suggested.length > 0 ? (
          suggested.map((allUsers) => (
            <div className="suggested" key={allUsers.userId}>
              {allUsers.userImage ? (
                <img
                  src={`${process.env.REACT_APP_URL}/images/users/${allUsers.userImage}`}
                  alt=""
                />
              ) : (
                <img src={DEFAULTPIC} alt="" />
              )}
              <div className="names">
                <Link to={`/profile/${allUsers.userId}`} className="links">
                  {allUsers.fullName ? allUsers.fullName : allUsers.username}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontWeight: 400 }}>No users yet</p>
        )}
      </div>
    </div>
  );
};

export default Leftbar;
