import "./emailBroadcast.scss";
import { Link } from "react-router-dom";

//Images

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import moment from "moment";

const EmailBroadcast = () => {
  document.title = "Blikonn - Mail broadcast";
  const { authToken } = useContext(AuthContext);

  const getEmailList = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/emails/getAllEmails/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  const {
    //isLoading,
    data: emails,
    //error,
  } = useQuery({
    queryKey: ["emailList"],
    queryFn: getEmailList,
  });

  return (
    <div className="emailBroadcasts">
      <div className="page-title">Email sent</div>
      <div className="employees-card">
        <div className="top">
          <div className="left">Employee Details</div>
          <Link to="/email-broadcast/send-email" className="link">
            <div className="right">Send a Mail</div>
          </Link>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Mail ID</th>
                <th>Mail Subject</th>
                <th>Sender Name</th>
                <th>Sender Picture</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {emails?.length > 0
                ? emails.map((mail, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{mail.emailId}</td>
                      <td>{mail.subject}</td>
                      <td>
                        <Link
                          to={`/employees/employee-details/${mail.employeeId}`}
                          style={{color:"blue"}}
                        >{`${mail.firstName} ${mail.lastName}`}</Link>
                      </td>
                      <td>
                        <img
                          src={`${process.env.REACT_APP_URL}/images/employees/${mail.profilePic}`}
                          alt=""
                        />
                      </td>
                      <td>
                        {moment(mail.date).format("MMMM Do YYYY, h:mm:ss a")}
                      </td>
                      <td>
                        <Link
                          to={`/email-broadcast/mail-details/${mail.employeeId}`}
                          className="link"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                : "No Emails found"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmailBroadcast;
