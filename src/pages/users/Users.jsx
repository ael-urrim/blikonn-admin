import "./users.scss";
import { Link } from "react-router-dom";

//Images
import DEFAULTPIC from "../../media/images/default.jpg";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import moment from "moment";

const Users = () => {
  const { authToken } = useContext(AuthContext);
  const getUsersList = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/adminUsers/allUser/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      //console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const {
    //isLoading,
    data: userDetails,
    //error,
  } = useQuery({
    queryKey: ["usersList"],
    queryFn: getUsersList,
  });

  return (
    <div className="users">
      <div className="page-title">Users</div>
      <div className="users-card">
        <div className="top">
          <div className="left">All users</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Picture</th>
              <th>Date joined</th>
              <th>Last login</th>
            </tr>
          </thead>

          <tbody>
            {userDetails?.length > 0
              ? userDetails.map((user, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      <Link to={`/user-details/${user.userId}`} className="link">
                        {user.fullName ? user.fullName : user.username}
                      </Link>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {user.userImage ? (
                        <img
                          src={`${process.env.REACT_APP_URL}/images/users/${user.userImage}`}
                          alt=""
                        />
                      ) : (
                        <img src={DEFAULTPIC} alt="" />
                      )}
                    </td>
                    <td>{moment(user.joined).format('MMMM Do YYYY, h:mm:ss a')}</td>
                    <td>June 20, 2023</td>
                  </tr>
                ))
              : "No Users"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
