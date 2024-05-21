import "./pages.scss";
import { Link } from "react-router-dom";

const Pages = () => {
  return (
    <div className="pages">
      <div className="page-title">Pages</div>
      <div className="pages-card">
        <div className="top">
          <div className="left">All pages</div>
          <Link to="/pages/add-new" className="link">
            <div className="right">Add New Page</div>
          </Link>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Page title</th>
                <th>Page link</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>1</td>
                <td>
                  <Link
                    to="/pages/edit-page/3"
                    className="link"
                  >
                    About us
                  </Link>
                </td>
                <td>
                  <Link
                    to="http://localhost:3000/about-us"
                    className="link"
                  >
                    http://localhost:3000/about-us
                  </Link>
                </td>
                <td>July 2, 1990</td>
                <td>January 20, 2023</td>
              </tr>

              <tr>
                <td>2</td>
                <td>
                  <Link
                    to="/pages/edit-page/3"
                    className="link"
                  >
                    Contents policy
                  </Link>
                </td>
                <td>
                  <Link
                    to="http://localhost:3000/contents-policy"
                    className="link"
                  >
                    http://localhost:3000/contents-policy
                  </Link>
                </td>
                <td>July 2, 1990</td>
                <td>January 20, 2023</td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <Link
                    to="/pages/edit-page/3"
                    className="link"
                  >
                    Advertisement policy
                  </Link>
                </td>
                <td>
                  <Link
                    to="http://localhost:3000/adverts-and-ads-policy"
                    className="link"
                  >
                    http://localhost:3000/adverts-and-ads-policy
                  </Link>
                </td>
                <td>July 2, 1990</td>
                <td>January 20, 2023</td>
              </tr>

              <tr>
                <td>4</td>
                <td>
                  <Link
                    to="/pages/edit-page/3"
                    className="link"
                  >
                    Cookie policy
                  </Link>
                </td>
                <td>
                  <Link
                    to="http://localhost:3000/cookie-policy"
                    className="link"
                  >
                    http://localhost:3000/cookie-policy
                  </Link>
                </td>
                <td>July 2, 1990</td>
                <td>January 20, 2023</td>
              </tr>

              <tr>
                <td>5</td>
                <td>
                  <Link
                    to="/pages/edit-page/3"
                    className="link"
                  >
                    Terms of use
                  </Link>
                </td>
                <td>
                  <Link
                    to="http://localhost:3000/terms-of-use"
                    className="link"
                  >
                    http://localhost:3000/terms-of-use
                  </Link>
                </td>
                <td>July 2, 1990</td>
                <td>January 20, 2023</td>
              </tr>

              <tr>
                <td>6</td>
                <td>
                  <Link
                    to="/pages/edit-page/3"
                    className="link"
                  >
                    Privacy policy
                  </Link>
                </td>
                <td>
                  <Link
                    to="http://localhost:3000/privacy-policy"
                    className="link"
                  >
                    http://localhost:3000/privacy-policy
                  </Link>
                </td>
                <td>July 2, 1990</td>
                <td>January 20, 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pages;
