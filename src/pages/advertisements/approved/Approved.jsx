import "./approved.scss";
import { Link, useLocation } from "react-router-dom";

const Approved = () => {
  const page = useLocation().pathname.split("/")[3];

  return (
    <div className="approved">
      <div className="page-title">Approved Advertisements</div>
      <div className="approved-card">
        <div className="top">
          <div className="left">All adverts</div>
          <div className="right">
            <Link
              to="/advertisements/approved-adverts"
              className="link"
            >
              <div className={page === "approved-adverts" ? "active" : ""}>
                Approved
              </div>
            </Link>
            <Link
              to="/advertisements/pending-adverts"
              className="link"
            >
              <div className={page === "pending-adverts" ? "active" : ""}>
                Pending
              </div>
            </Link>
            <Link
              to="/advertisements/rejected-adverts"
              className="link"
            >
              <div className={page === "rejected-adverts" ? "active" : ""}>
                Rejected
              </div>
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
                <td>Approved</td>
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
                <td>Approved</td>
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
                <td>Approved</td>
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
                <td>Approved</td>
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

export default Approved;
