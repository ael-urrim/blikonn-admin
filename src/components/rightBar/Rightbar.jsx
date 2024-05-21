import "../../main.scss";
import "./rightbar.scss";
import ADVERTS1 from "../../media/images/ads.jpg";
import ADVERTS2 from "../../media/images/ads2.jpg";
import ADVERTS3 from "../../media/images/ads3.png";
import { Link } from "react-router-dom";

import { TbWorldUpload } from "react-icons/tb";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import moment from "moment";

const Rightbar = () => {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <div className="rightbar">
      <div className="adverts">
        <img src={ADVERTS1} alt="" />
        <Link to="/" className="link">
          <div className="advert-bottom">
            <p>www.jumia.com.ng</p>
            <p className="promoted">
              Promoted <TbWorldUpload />
            </p>
          </div>
        </Link>
      </div>

      <div className="card-one">
        <h2 className="heading">Get ahead of your competitors</h2>
        <div className="sample-img">
          <img src={ADVERTS2} alt="" />
          <img src={ADVERTS3} alt="" />
        </div>
        <p>Claim N5000 free ads credit</p>
        <Link to={`/ads/ads-overview/${loggedInUser.userId}`} className="links">
          Claim N5000 now
        </Link>
      </div>

      <div className="links-card">
        <div className="top">
          <div className="left">
            <Link to="/about-us" className="links">
              About Us
            </Link>
            <Link to="/terms-of-use" className="links">
              Terms of Use
            </Link>
            <Link to="/adverts-and-ads-policy" className="links">
              Advertisement and Ads Policy
            </Link>
          </div>

          <div className="right">
            <Link to="/cookie-policy" className="links">
              Cookie Policy
            </Link>
            <Link to="/help-center" className="links">
              Help Center
            </Link>
            <Link to="/contents-policy" className="links">
              Content Policy
            </Link>
          </div>
        </div>
        <div className="bottom">
          <p>Blikonn Inc &copy; {moment().year()}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
