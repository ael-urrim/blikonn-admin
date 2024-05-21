import "./advertsLeftbar.scss";

//Icons
import { TbBrandCampaignmonitor } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { BsGear, BsHddStack } from "react-icons/bs";
import { MdBugReport } from "react-icons/md";

//Links
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const AdvertsLeftBar = () => {
  const {loggedInUser} = useContext(AuthContext)
  return (
    <div className="adspage-leftbar">

      <Link to={`/ads/ads-overview/${loggedInUser.userId}`} className="link">
        <BsHddStack className="icons" /> Account Overview
      </Link>

      <Link to={`/ads/campaigns/${loggedInUser.userId}`} className="link">
        <TbBrandCampaignmonitor className="icons" /> Campaigns
      </Link>

      <Link to={`/ads/fund-account/${loggedInUser.userId}`} className="link">
        <GiMoneyStack className="icons" /> Fund account
      </Link>

      <Link to={`/ads/account-settings/${loggedInUser.userId}`} className="link">
        <BsGear className="icons" /> Ad account Settings
      </Link>

      <Link to="/ads/report-ad-problem" className="link">
        <MdBugReport className="icons" /> Report a problem
      </Link>

    </div>
  );
};

export default AdvertsLeftBar;
