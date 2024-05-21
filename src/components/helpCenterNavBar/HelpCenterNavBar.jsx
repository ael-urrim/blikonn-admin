import { Link } from "react-router-dom";

import "./helpCenterNavBar.scss";
import { BsFillMoonFill, BsSunFill, BsSearch } from "react-icons/bs";
import { FaUserAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineHelp } from "react-icons/md";
import PROFILE_IMG from "../../media/images/default.jpg";
import { useContext, useState } from "react";
import { darkModeContext } from "../../context/darkModeContext";

const Navbar = () => {
  // For the menu dropdown
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  const toggleDropDown = () => {
    setOpenMenuDropdown(!openMenuDropdown);
  };

  // For the dark mode toggel
  const { toggle, darkMode } = useContext(darkModeContext);
  return (
    <div className="help-navbar">
      <div className="navbar-left">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <span className="logo">Yurrim Help Center</span>
        </Link>
        <div className="search">
          <BsSearch />
          <input type="text" placeholder="How can we help you?" />
        </div>
      </div>

      {/* Nabar Right */}
      <div className="navbar-right">
        <div className="dark-mode">
          {darkMode ? (
            <BsSunFill onClick={toggle} />
          ) : (
            <BsFillMoonFill onClick={toggle} />
          )}
        </div>

        <div className="profile-img" onClick={toggleDropDown}>
          <img src={PROFILE_IMG} alt="" />
        </div>

        {/* Mobile menu */}
        <div className="profile-img-mobile">
          <Link to="/menu">
            <img src={PROFILE_IMG} alt="" />
          </Link>
        </div>

        <div className="menu-bar">
          <Link to="/help-center-menu">
            <FaBars className="icon" />
          </Link>
        </div>
      </div>

      {openMenuDropdown && (
        <div className="overlay" onClick={toggleDropDown}>
          <div className="dropdown-links">
            <div className="dropdown">
              <Link to="/profile/2" className="links">
                <FaUserAlt className="icons" /> Profile
              </Link>
              <Link to="/settings/4" className="links">
                <AiFillSetting className="icons" /> Settings
              </Link>
              <Link to="/create-ad/2" className="links">
                <RiAdvertisementFill className="icons" />
                Create Ads
              </Link>
              <Link to="/help-center" className="links">
                <MdOutlineHelp className="icons" /> Help And Feedback
              </Link>
              <Link to="/login" className="links">
                <FaSignOutAlt className="icons" /> Log Out
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
