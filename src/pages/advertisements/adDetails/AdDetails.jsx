import "./adDetails.scss";
import { Link } from "react-router-dom";

//Images
import USER1 from "../../../media/images/user1.jpg";

const AdDetails = () => {
  return (
    <div className="ad-details">
      <div className="breadcrumbs">
        <Link to="/advertisements" className="link">
          Advertisements
        </Link>
        <p>/</p>
        <p>Ad Details</p>
      </div>
      <div className="page-title">Ad Details</div>
      <div className="ad-details-card">
        <div className="top">
          <p>Approve</p>
          <p>Reject</p>
          <Link to="/advertisements/ad-stats/3" className="link">
            Ad Stats
          </Link>
        </div>

        <div className="table">
          <table>
            <tr>
              <td className="label">Ad title:</td>
              <td className="value">Jumia.com.ng black Friday sales</td>
            </tr>
            <tr>
              <td className="label">Ad banner:</td>
              <td className="value">
                <img src={USER1} alt="" />
              </td>
            </tr>
            <tr>
              <td className="label">Ad link:</td>
              <td className="value">www.jumia.com</td>
            </tr>
            <tr>
              <td className="label">Ad link short description:</td>
              <td className="value">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Ratione, non.
              </td>
            </tr>
            <tr>
              <td className="label">Link button text:</td>
              <td className="value">Get Offer</td>
            </tr>
            <tr>
              <td className="label">Ad description:</td>
              <td className="value">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
                deserunt eligendi illo maxime error voluptas natus recusandae
                rem, vitae sunt!
              </td>
            </tr>
            <tr>
              <td className="label">Daily budget:</td>
              <td className="value">$10,000</td>
            </tr>
            <tr>
              <td className="label">Target audience:</td>
              <td className="value">Africa</td>
            </tr>
            <tr>
              <td className="label">Target age group:</td>
              <td className="value">16 -20</td>
            </tr>
            <tr>
              <td className="label">Ad category:</td>
              <td className="value">Education</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdDetails;
