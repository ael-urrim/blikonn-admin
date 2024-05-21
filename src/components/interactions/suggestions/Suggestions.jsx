import "./suggestions.scss";

//Verification badge
import VERIFIED from "../../../media/icons/verified.png";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "../../../axios";

const Suggestions = () => {
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await makeRequest.get("/interactions/getSuggestedUsers/");
      setSuggested(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="user-info">
      <div className="left">
        <img src={suggested.profilePic} alt="" />
        <div className="user-details">
          <div className="name">
            <Link to={`/profile/${suggested.userId}`} className="links">
              <p>{suggested.displayName ? suggested.displayName : suggested.username}</p>
              {suggested.verified ? <img src={VERIFIED} alt="" /> : null}
            </Link>
          </div>
          <div className="bio">
            <p>{suggested.bio}</p>
          </div>
        </div>
      </div>
      <div className="right">
        <button>Follow</button>
      </div>
    </div>
  );
};

export default Suggestions;
