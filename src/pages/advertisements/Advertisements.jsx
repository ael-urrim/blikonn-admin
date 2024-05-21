import "./advertisements.scss";
import { Link } from "react-router-dom";

const Advertisements = () => {
  return (
    <div className="advertisements">
      <div className="page-title">Advertisements</div>
      <div className="advertisements-card">
        <div className="top">
            <div className="left">All adverts</div>
          <div className="right">
            <Link to="/advertisements/approved-adverts" className="link">
              <div className="right">Approved</div>
            </Link>
            <Link to="/advertisements/pending-adverts" className="link">
              <div className="right">Pending</div>
            </Link>
            <Link to="/advertisements/rejected-adverts" className="link">
              <div className="right">Rejected</div>
            </Link>
          </div>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Campaign</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Reach</th>
                <th>Impression</th>
                <th>Amount spent</th>
                <th>Ends</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <Link to="/advertisements/ad-details/3" className="link">
                  Jumia.com.ng black Friday sales
                  </Link>
                </td>
                <td className="approved">Approved</td>
                <td>N10000</td>
                <td>13k people</td>
                <td>10k</td>
                <td>N2000</td>
                <td>June 20, 2023</td>
              </tr>

              <tr>
                <td>2</td>
                <td>
                  <Link to="/advertisements/ad-details/3" className="link">
                  Konga summer sales
                  </Link>
                </td>
                <td className="approved">Approved</td>
                <td>N10000</td>
                <td>13k people</td>
                <td>10k</td>
                <td>N2000</td>
                <td>June 20, 2023</td>
              </tr>

              <tr>
                <td>3</td>
                <td>
                  <Link to="/advertisements/ad-details/3" className="link">
                  Udemy flash sales
                  </Link>
                </td>
                <td className="pending">Pending</td>
                <td>N10000</td>
                <td>13k people</td>
                <td>10k</td>
                <td>N2000</td>
                <td>June 20, 2023</td>
              </tr>

              <tr>
                <td>4</td>
                <td>
                  <Link to="/advertisements/ad-details/3" className="link">
                  Glo data promo
                  </Link>
                </td>
                <td className="rejected">Rejected</td>
                <td>N10000</td>
                <td>13k people</td>
                <td>10k</td>
                <td>N2000</td>
                <td>June 20, 2023</td>
              </tr>

              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Advertisements;
