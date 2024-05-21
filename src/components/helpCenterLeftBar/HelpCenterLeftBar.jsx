import { Link } from "react-router-dom";
import "../../main.scss";
import "./helpCenterLeftBar.scss";
import { FaMousePointer, FaQuestionCircle } from "react-icons/fa";
import { MdOutlineManageHistory, MdHealthAndSafety, MdReportProblem } from "react-icons/md";

const HelpCenterLeftbar = () => {
  return (
    <div className="HelpCenterLeftbar">
      {/* Card One */}
      <div className="card-one">
        <div className="home-link">
          <Link to="/using-yurrim" className="link">
            <FaMousePointer className="icons" /> Using Yurrim
          </Link>
        </div>
        <div className="interactions-link">
          <Link to="/managing-your-account" className="link">
            <MdOutlineManageHistory className="icons" /> Managing your account
          </Link>
        </div>
        <div className="notifications-link">
          <Link to="/safety-and-security" className="link">
            <MdHealthAndSafety className="icons" /> Safety and security
          </Link>
        </div>
        <div className="notifications-link">
          <Link to="/rules-and-policies" className="link">
            <MdReportProblem className="icons" /> Rules and policies
          </Link>
        </div>
        <div className="notifications-link">
          <Link to="/frequently-asked-questions" className="link">
            <FaQuestionCircle className="icons" /> Frequently asked questions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterLeftbar;
