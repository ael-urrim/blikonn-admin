import "./adminNavbar.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { darkModeContext } from "../../context/darkModeContext";

import USER1 from "../../media/images/user2.jpg";
import USER2 from "../../media/images/user3.jpg";
import USER3 from "../../media/images/user4.jpg";
import USER4 from "../../media/images/user5.jpg";
import USER5 from "../../media/images/team1.jpg";
import USER6 from "../../media/images/team2.jpg";

//Icons
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";
import { FaUserAlt, FaSignOutAlt, FaBars } from "react-icons/fa";
//import { RiAdvertisementFill } from "react-icons/ri";
import { AiFillSetting } from "react-icons/ai";
import { MdOutlineHelp } from "react-icons/md";
import { MdNotifications } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import { AuthContext } from "../../context/authContext";

const AdminNavbar = () => {
  // For the dark mode toggle
  const { toggle, darkMode } = useContext(darkModeContext);
  const { logout, userDetails } = useContext(AuthContext);

  // For the menu dropdown
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  const toggleMenuDropDown = () => {
    setOpenMenuDropdown(!openMenuDropdown);
  };

  // For the menu dropdown
  const [openInboxDropdown, setOpenInboxDropdown] = useState(false);
  const toggleInboxDropDown = () => {
    setOpenInboxDropdown(!openInboxDropdown);
  };

  // For the menu dropdown
  const [openNotifDropdown, setOpenNotifDropdown] = useState(false);
  const toggleNotifDropDown = () => {
    setOpenNotifDropdown(!openNotifDropdown);
  };

  const [menuSwitch, setMenuSwitch] = useState(true);
  const toggleMenu = () => {
    const options = document.querySelectorAll(".label");
    const leftBar = document.querySelector(".admin-leftbar");

    options.forEach((option) => {
      if (menuSwitch) {
        option.style.display = "none";
      } else {
        option.style.display = "block";
      }
    });

    if (menuSwitch) {
      leftBar.style.maxWidth = "50px";
    } else {
      leftBar.style.maxWidth = "180px";
    }

    setMenuSwitch(!menuSwitch);
  };

  return (
    <div className="admin-navbar">
      <div className="left">
        <FaBars
          className="icon"
          onClick={toggleMenu}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
        <Link to="/" className="link">
          Admin Panel
        </Link>
      </div>

      <div className="right">
        <div className="notif" onClick={toggleNotifDropDown}>
          <MdNotifications className="icons" />
          <p>15</p>
        </div>
        <div className="inbox" onClick={toggleInboxDropDown}>
          <HiMail className="icons" />
          <p>25</p>
        </div>
        <div className="dark-mode-switch">
          {darkMode ? (
            <BsSunFill onClick={toggle} />
          ) : (
            <BsFillMoonFill onClick={toggle} />
          )}
        </div>
        <div className="user-name">
          <p>Hi {userDetails.firstName}!</p>
        </div>
        <div className="user-img" onClick={toggleMenuDropDown}>
          <img
            src={`${process.env.REACT_APP_URL}/images/employees/${userDetails?.profilePic}`}
            alt=""
          />
        </div>
      </div>

      {openMenuDropdown && (
        <div className="menu-overlay" onClick={toggleMenuDropDown}>
          <div className="dropdown-links">
            <div className="dropdown">
              <Link to="/admin/profile/2" className="links">
                <FaUserAlt className="icons" /> Profile
              </Link>
              <Link to="/admin/settings/4" className="links">
                <AiFillSetting className="icons" /> Settings
              </Link>
              {/* <Link to="/ads-overview/2" className="links">
                <RiAdvertisementFill className="icons" />
                Create Ads
              </Link> */}
              <Link to="/admin/help-center" className="links">
                <MdOutlineHelp className="icons" /> Help And Notes
              </Link>
              <Link to="/logout" className="links" onClick={logout}>
                <FaSignOutAlt className="icons" /> Log Out
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Inbox menu */}
      {openInboxDropdown && (
        <div className="inbox-overlay" onClick={toggleInboxDropDown}>
          <div className="dropdown-links">
            <div className="dropdown">
              <p>
                <Link className="link">See all inbox Messages</Link>
              </p>
              <hr style={{ color: "lightgray" }} />
              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER1} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Omolola Gloria</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER2} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Melinda Ray</p>
                    <p className="description">Where can I run ads?</p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER3} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Samuel Doe</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER4} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Adeola Jane</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER5} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Olamide Joshua</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER6} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Angelina Morris</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Notif menu */}
      {openNotifDropdown && (
        <div className="notif-overlay" onClick={toggleNotifDropDown}>
          <div className="dropdown-links">
            <div className="dropdown">
              <p>
                <Link className="link">See all notifications</Link>
              </p>
              <hr style={{ color: "lightgray" }} />
              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER1} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Omolola Gloria</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER2} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Melinda Ray</p>
                    <p className="description">Where can I run ads?</p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER3} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Samuel Doe</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER4} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Adeola Jane</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER5} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Olamide Joshua</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/profile/2" className="links">
                <div className="notif">
                  <div className="left">
                    <img src={USER6} alt="" />
                  </div>
                  <div className="right">
                    <p className="name">Angelina Morris</p>
                    <p className="description">
                      I've been unable to login to my account. Pls...
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
