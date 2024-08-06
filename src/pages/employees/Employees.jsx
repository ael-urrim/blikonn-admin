import "./employees.scss";
import { Link } from "react-router-dom";

//Images

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import moment from "moment";

const Employees = () => {
  const { authToken } = useContext(AuthContext);
  const getEmployeesList = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/employees/allEmployees/`,
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
    data: employees,
    //error,
  } = useQuery({
    queryKey: ["employeesList"],
    queryFn: getEmployeesList,
  });

  return (
    <div className="employees">
      <div className="page-title">Employees</div>
      <div className="employees-card">
        <div className="top">
          <div className="left">Employee Details</div>
          <Link to="/employees/add-employee" className="link">
            <div className="right">Add New Employee</div>
          </Link>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Picture</th>
                <th>Employment date</th>
                <th>Department</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {employees?.length > 0
                ? employees.map((employee, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{`${employee.firstName} ${employee.lastName}`}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phoneNumber}</td>
                      <td>
                        <img
                          src={`${process.env.REACT_APP_URL}/images/employees/${employee.profilePic}`}
                          alt=""
                        />
                      </td>
                      <td>
                        {moment(employee.employedOn).format("MMMM Do YYYY")}
                      </td>
                      <td>{employee.department}</td>
                      <td>
                        <Link
                          to={`/employees/employee-details/${employee.employeeId}`}
                          className="link"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                : "No Employee found"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
