import { useContext } from "react";
import "./adminLeftbar.scss";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import {
  FaShoppingCart,
  FaEnvelope,
  FaUsers,
  FaChartBar,
  FaUser,
} from "react-icons/fa";
import {
  MdInsertPageBreak,
  MdOutlineHealthAndSafety,
  MdOutlineLogout,
} from "react-icons/md";
import { IoLogoBuffer } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { BsDatabaseFillGear } from "react-icons/bs";

const AdminLeftbar = () => {
  const { logout } = useContext(AuthContext);
  const page = useLocation().pathname.split("/")[1];

  // const [menuSwitch, setMenuSwitch] = useState(true);
  // const toggleMenu = () => {
  //   const options = document.querySelectorAll(".label");
  //   const leftBar = document.querySelector(".admin-leftbar");

  //   options.forEach((option) => {
  //     if (menuSwitch) {
  //       option.style.display = "none";
  //     } else {
  //       option.style.display = "block";
  //     }
  //   });

  //   if (menuSwitch) {
  //     leftBar.style.maxWidth = "50px";
  //   } else {
  //     leftBar.style.maxWidth = "180px";
  //   }

  //   setMenuSwitch(!menuSwitch);
  // };

  return (
    <div className="admin-leftbar">
      <Link to="/" className="home">
        <div className={page === "dashboard" ? "active" : ""}>
          <div className="label">Dashboard</div>
        </div>
      </Link>

      <hr style={{ marginTop: 10, marginBottom: 10 }} />

      <div className="options">
        <Link to="/employees" className="link">
          <div className={page === "employees" ? "active" : ""}>
            <FaUsers className="icon" title="Employees" />
            <div className="label">Employees</div>
          </div>
        </Link>

        <Link to="/users" className="link">
          <div className={page === "users" ? "active" : ""}>
            <FaUser className="icon" title="Users" />
            <div className="label">Users</div>
          </div>
        </Link>

        <Link to="/advertisements" className="link">
          <div className={page === "advertisements" ? "active" : ""}>
            <FaShoppingCart className="icon" title="Advertisements" />
            <div className="label">Adverts</div>
          </div>
        </Link>

        <Link to="/pages" className="link">
          <div className={page === "pages" ? "active" : ""}>
            <MdInsertPageBreak className="icon" title="Pages" />
            <div className="label">Pages</div>
          </div>
        </Link>

        <Link to="/sales" className="link">
          <div className={page === "statistics" ? "active" : ""}>
            <FaChartBar className="icon" title="Sales" />
            <div className="label">Sales</div>
          </div>
        </Link>

        <Link to="/system-health" className="link">
          <div className={page === "system-health" ? "active" : ""}>
            <MdOutlineHealthAndSafety className="icon" title="System health" />
            <div className="label">System health</div>
          </div>
        </Link>

        <Link to="/logs" className="link">
          <div className={page === "logs" ? "active" : ""}>
            <IoLogoBuffer className="icon" title="Logs" />
            <div className="label">Logs</div>
          </div>
        </Link>

        <Link to="/settings" className="link">
          <div className={page === "settings" ? "active" : ""}>
            <BsDatabaseFillGear className="icon" title="Settings" />
            <div className="label">Settings</div>
          </div>
        </Link>

        <Link to="/email-broadcast" className="link">
          <div className={page === "inbox" ? "active" : ""}>
            <FaEnvelope className="icon" title="Mail Broadcast" />
            <div className="label">Mail Broadcast</div>
          </div>
        </Link>

        <Link to="/inbox" className="link">
          <div className={page === "inbox" ? "active" : ""}>
            <BiSupport className="icon" title="Support inbox" />
            <div className="label">Support Inbox</div>
          </div>
        </Link>

        <Link to="/logout" className="link" onClick={logout}>
          <div>
            <MdOutlineLogout className="icon" title="Log out" />
            <div className="label">Log out</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminLeftbar;
