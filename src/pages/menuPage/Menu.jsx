import { Link, useNavigate } from "react-router-dom";
import "./menu.scss";

// Icon
import {
  FaUserAlt,
  FaSignOutAlt,
  FaUserFriends,
  FaCookie,
  FaInbox,
} from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import {
  MdNotifications,
  MdOutlineHelp,
  MdOutlinePolicy,
} from "react-icons/md";
import {
  BsFillMoonFill,
  BsSunFill,
  BsFileRuledFill,
  BsFillMouse2Fill,
} from "react-icons/bs";
import { FcAbout } from "react-icons/fc";

// Imports
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { darkModeContext } from "../../context/darkModeContext";
import axios from "axios";
import { makeRequest } from "../../axios";

const Menu = () => {
  const { loggedInUser, logout, userDetails } = useContext(AuthContext);
  // For the dark mode toggle
  const { toggle, darkMode } = useContext(darkModeContext);

  //Logout system
  // const navigate = useNavigate();
  // const handleLogout = async (e) => {
  //   e.preventDefault();

  //   await axios
  //     .post("http://localhost:8800/api/auth/logout")
  //     .then(navigate("/login"))
  //     .catch((error) => console.log(error));
  // };

  // Get logged in user details
  //const signedInUserId = loggedInUser.userId;
  // const [userDetails, setUserDetails] = useState([]);

  // useEffect(() => {
  //   const UserData = async () => {
  //     try {
  //       const res = await makeRequest.get("/users/find/" + signedInUserId);
  //       setUserDetails(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   UserData();
  // }, [signedInUserId]);

  return (
    <div className="menu">
      <div className="menu-card">
        <div className="heading">Menu</div>
        <hr />

        <div className="menu-links">
          <Link to={`/profile/${userDetails.userId}`} className="mobile-links">
            <FaUserAlt className="mobile-icons" /> My Profile
          </Link>
          <Link
            to={`/interactions/${userDetails.userId}`}
            className="mobile-links"
          >
            <FaUserFriends className="mobile-icons" /> Interactions
          </Link>
          <Link
            to={`/notifications/${userDetails.userId}`}
            className="mobile-links"
          >
            <MdNotifications className="mobile-icons" /> Notifications
          </Link>
          <Link
            to={`/ads/ads-overview/${userDetails.userId}`}
            className="mobile-links"
          >
            <RiAdvertisementFill className="mobile-icons" />
            Create Ads
          </Link>
          <div className="dark-mode-switch">
            {darkMode ? (
              <span className="mobile-links" onClick={toggle}>
                <BsSunFill className="mobile-icons" />
                Light Mode
              </span>
            ) : (
              <span className="mobile-links" onClick={toggle}>
                <BsFillMoonFill className="mobile-icons" />
                Dark Mode
              </span>
            )}
          </div>
          <Link to={`/settings/${userDetails.userId}`} className="mobile-links">
            <AiFillSetting className="mobile-icons" /> Settings
          </Link>
          <hr />
          <Link to="/about-us" className="mobile-links">
            <FcAbout className="mobile-icons" /> About Us
          </Link>
          <Link to="/terms-of-use" className="mobile-links">
            <BsFillMouse2Fill className="mobile-icons" />
            Terms of Use
          </Link>
          <Link to="/adverts-and-ads-policy" className="mobile-links">
            <BsFileRuledFill className="mobile-icons" />
            Advertisement and Ads Policy
          </Link>
          <Link to="/cookie-policy" className="mobile-links">
            <FaCookie className="mobile-icons" />
            Cookie Policy
          </Link>
          <Link to="/contents-policy" className="mobile-links">
            <MdOutlinePolicy className="mobile-icons" />
            Content Policy
          </Link>
          <Link to="/help-center" className="mobile-links">
            <MdOutlineHelp className="mobile-icons" />
            Help Center
          </Link>
          <Link to="/support-inbox" className="mobile-links">
            <FaInbox className="mobile-icons" /> Support Inbox
          </Link>
          <div onClick={logout} className="mobile-links mobile-logout">
            <FaSignOutAlt className="mobile-icons" /> Log Out
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
