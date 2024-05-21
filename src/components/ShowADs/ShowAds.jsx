import "./showAds.scss";
import DEFAULTPIC from "../../media/images/default.jpg";

//Verified badge
import VERIFIED from "../../media/icons/verified.png";

// Icons
import { FaEllipsisH, FaRegCommentAlt, FaRegEye } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { TbWorldUpload } from "react-icons/tb";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { makeRequest } from "../../axios";

const ShowAds = () => {
  const [adverts, setAdverts] = useState([]);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await makeRequest.get("/adverts/showAdverts/");
        setAdverts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAds();
  }, []);

  return (
    <>
      {adverts.map((advert, index) => (
        <div className="show-ads" key={index}>
          <div className="top">
            <div className="right-left">
              {advert.profilePic ? (
                <img src={"./uploads/" + advert.profilePic} alt="" />
              ) : (
                <img src={DEFAULTPIC} alt="" />
              )}
            </div>

            <div className="show-ads-right-right">
              <div className="authorDetails">
                <div className="authorDetails-top">
                  <div className="authorName">
                    <Link to={`/profile/${advert.userId}`} className="link">
                      {advert.displayName}
                    </Link>
                    {advert.verified === 1 && <img src={VERIFIED} alt="" />}
                  </div>
                  <FaEllipsisH className="icon" />
                </div>
                <div className="authorDetails-bottom">
                  <p className="promoted">
                    Promoted <TbWorldUpload />
                  </p>
                </div>
              </div>

              <div className="adDetails">
                <p className="adDescription">{advert.adDescription}</p>
                <Link to={`http://${advert.adLink}`} className="link">
                  <div className="ad-link">
                    <div className="top">
                      <img
                        src={"./uploads/" + advert.adBanner}
                        alt=""
                        className="adImage"
                      />
                    </div>

                    <div className="bottom">
                      <div className="ad-link-left">
                        <div className="one">{advert.adLink}</div>
                        <div className="two">
                          {advert.linkShortDescrip.slice(0, 67)}...
                        </div>
                      </div>
                      <div className="ad-link-right">{advert.linkBtnText}</div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="post-reactions">
                <div className="ad-interactions likes">
                  <BsHeart className="icon" />
                  <p>100</p>
                </div>
                <div className="ad-interactions comments">
                  <FaRegCommentAlt className="icon" />
                  <p>50</p>
                </div>
                <div className="ad-interactions shares">
                  <RiArrowLeftRightFill className="icon" />
                  <p>20</p>
                </div>
                <div className="ad-interactions views">
                  <FaRegEye className="icon" />
                  <p>350</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowAds;
