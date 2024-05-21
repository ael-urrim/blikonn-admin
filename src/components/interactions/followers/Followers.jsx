import "./followers.scss";

//Verification badge
import VERIFIED from "../../../media/icons/verified.png";

import { Link } from "react-router-dom";

const Followers = ({ user }) => {
  return (
    <div className="user-info">
      <div className="left">
        <img src={user.userImg} alt="" />
        <div className="user-details">
          <div className="name">
            <Link to={`/profile/${user.userId}`} className="links">
              <p>{user.display_name}</p>
              {user.verified ? <img src={VERIFIED} alt="" /> : null}
            </Link>
          </div>
          <div className="bio">
            <p>{user.bio}</p>
          </div>
        </div>
      </div>
      <div className="right">
        {user.following ? <button>Unfollow</button> : <button>Follow</button>}
      </div>
    </div>
  );
};

export default Followers;
