import { Link, useNavigate } from "react-router-dom";

import "./navbar.scss";
import { BsFillMoonFill, BsSunFill, BsSearch } from "react-icons/bs";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineHelp, MdNotifications } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import DEFAULTPIC from "../../media/images/default.jpg";
import { useContext, useState } from "react";
import { darkModeContext } from "../../context/darkModeContext";

import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Navbar = () => {
  const { loggedInUser, logout, userDetails, authToken } =
    useContext(AuthContext);

  // For the menu dropdown
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  const toggleDropDown = () => {
    setOpenMenuDropdown(!openMenuDropdown);
  };

  // For the dark mode toggle
  const { toggle, darkMode } = useContext(darkModeContext);

  // Notifications Counter
  const notificationsCounter = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/notifications/notificationsCount/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      //console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const {
    isLoading,
    data: notificationsCount,
    error,
  } = useQuery({
    queryKey: ["notifCount"],
    queryFn: notificationsCounter,
  });

  // console.log(notificationsCount);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="link">
          <span className="logo">Blikonn</span>
        </Link>
        <div className="search">
          <BsSearch />
          <input type="text" placeholder="Search Blikonn" />
        </div>
      </div>

      {/* Nabar Right */}
      <div className="navbar-right">
        <Link to="/messages" className="navbar-icon messages">
          <HiMail />
          <p>15</p>
        </Link>

        <Link
          to={`/notifications/${loggedInUser.userId}`}
          className="navbar-icon notificaions"
        >
          <MdNotifications className="icons" />
          {notificationsCount > 0 ? (
            <p>{notificationsCount}</p>
          ) : (
            ""
          )}
        </Link>

        <div className="dark-mode-switch">
          {darkMode ? (
            <BsSunFill onClick={toggle} />
          ) : (
            <BsFillMoonFill onClick={toggle} />
          )}
        </div>

        <Link to={`/settings/${loggedInUser.userId}`} className="navbar-icon">
          <AiFillSetting className="icons" />
        </Link>

        <div className="profile-img" onClick={toggleDropDown}>
          {userDetails.userImage ? (
            <img
              src={`${process.env.REACT_APP_URL}/images/users/${userDetails.userImage}`}
              alt=""
            />
          ) : (
            <img src={DEFAULTPIC} alt="" />
          )}
        </div>

        {/* Mobile menu */}
        <div className="profile-img-mobile">
          <Link to="/menu">
            {userDetails.userImage ? (
              <img
                src={`${process.env.REACT_APP_URL}/images/users/${userDetails.userImage}`}
                alt=""
              />
            ) : (
              <img src={DEFAULTPIC} alt="" />
            )}
          </Link>
        </div>
      </div>

      {openMenuDropdown && (
        <div className="overlay" onClick={toggleDropDown}>
          <div className="dropdown-links">
            <div className="dropdown">
              <Link to={`/profile/${userDetails.userId}`} className="links">
                <FaUserAlt className="icons" /> Profile
              </Link>
              <Link to={`/settings/${userDetails.userId}`} className="links">
                <AiFillSetting className="icons" /> Settings
              </Link>
              <Link
                to={`/ads/ads-overview/${userDetails.userId}`}
                className="links"
              >
                <RiAdvertisementFill className="icons" />
                Create Ads
              </Link>
              <Link to="/help-center" className="links">
                <MdOutlineHelp className="icons" /> Help And Feedback
              </Link>
              <p onClick={logout} className="links">
                <FaSignOutAlt className="icons" /> Log Out
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
