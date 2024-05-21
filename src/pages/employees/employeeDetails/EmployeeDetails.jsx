import "./employeeDetails.scss";
import { Link, useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import moment from "moment";

const EmployeeDetails = () => {
  const { authToken } = useContext(AuthContext);
  const employeeId = useLocation().pathname.split("/")["3"];

  const getEmployeeData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/employees/getEmployeeData/${employeeId}`,
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
    data: employeeDetails,
    //error,
  } = useQuery({
    queryKey: ["employeeDetails", employeeId],
    queryFn: getEmployeeData,
  });

  return (
    <div className="employees-details">
      <div className="breadcrumbs">
        <Link to="/employees" className="link">
          Employees
        </Link>
        <p>/</p>
        <p>Employee Details</p>
      </div>
      <div className="page-title">Employee details</div>

      <div className="employees-details-card">
        <div className="top">
          <Link
            to={`/employees/edit-details/${employeeDetails?.employeeId}}`}
            className="link"
          >
            Edit Details
          </Link>
        </div>
        <div className="data">
          <div className="left">
            <table>
              <tr>
                <td className="label">Picture:</td>
                <td className="value">
                  <img
                    src={`${process.env.REACT_APP_URL}/images/employees/${employeeDetails?.profilePic}`}
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td className="label">First Name:</td>
                <td className="value">{employeeDetails?.firstName}</td>
              </tr>
              <tr>
                <td className="label">Middle Name:</td>
                <td className="value">{employeeDetails?.middleName}</td>
              </tr>
              <tr>
                <td className="label">Last Name:</td>
                <td className="value">{employeeDetails?.lastName}</td>
              </tr>
              <tr>
                <td className="label">Email:</td>
                <td className="value">{employeeDetails?.email}</td>
              </tr>
              <tr>
                <td className="label">Phone Number:</td>
                <td className="value">{employeeDetails?.phoneNumber}</td>
              </tr>
              <tr>
                <td className="label">Home Address:</td>
                <td className="value">{employeeDetails?.address}</td>
              </tr>
              <tr>
                <td className="label">Date of Birth:</td>
                <td className="value">{moment(employeeDetails?.DOB).format("LL")}</td>
              </tr>
              {/* <tr>
                <td className="label">Next of Kin:</td>
                <td className="value">Samuel Joshua Doe</td>
              </tr>
              <tr>
                <td className="label">Referee 1:</td>
                <td className="value">Samuel Joshua Doe</td>
              </tr>
              <tr>
                <td className="label">Referee 2:</td>
                <td className="value">Samuel Joshua Doe</td>
              </tr> */}
            </table>
          </div>

          <div className="right">
            <table>
              <tr>
                <td className="label">Employment date:</td>
                <td className="value">{moment(employeeDetails?.employedOn).format("LL")}</td>
              </tr>
              <tr>
                <td className="label">Salary (Monthly):</td>
                <td className="value">N{employeeDetails?.salary} </td>
              </tr>
              <tr>
                <td className="label">Salary (Annually):</td>
                <td className="value">N{employeeDetails?.salary * 12} </td>
              </tr>
              <tr>
                <td className="label">Department:</td>
                <td className="value">{employeeDetails?.department}</td>
              </tr>
              <tr>
                <td className="label">Position:</td>
                <td className="value">{employeeDetails?.position} </td>
              </tr>
              <tr>
                <td className="label">Employment Status :</td>
                <td className="value">{employeeDetails?.employmentStatus}</td>
              </tr>
              <tr>
                <td className="label">Employment Type:</td>
                <td className="value">{employeeDetails?.employmentType}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
