import axios from "axios";
import "./editEmployeeDetails.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";

const EditEmployeeDetails = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
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

  // console.log(employeeDetails);

  // Add employee
  const [isLoading, setIsloading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [picture, setPicture] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const editEmployee = async (e) => {
    setIsloading(true);
    e.preventDefault();
    let imgUrl = "";
    if (picture) {
      try {
        const formData = new FormData();
        formData.append("employeesImage", picture);
        const res = await axios.post(
          `${process.env.REACT_APP_URL}/employeesImage/upload`,
          formData
        );
        imgUrl = res.data;
      } catch (error) {
        console.log("Error processing image:", error);
      }
    }

    const data = {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      // password,
      address,
      birthday,
      picture: imgUrl,
      employmentDate,
      monthlySalary,
      department: department ? department : "Admin",
      position: position ? position : "HRM",
      employmentStatus: employmentStatus ? employmentStatus : "Active",
      employmentType: employmentType ? employmentType : "Staff",
    };
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/employees/addEmployee`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setIsloading(false);
      navigate("/employees");
      return res.data;
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };
  return (
    <div className="edit-employee-details">
      <div className="breadcrumbs">
        <Link to="/employees" className="link">
          Employees
        </Link>
        <p>/</p>
        <Link to="/employees/employee-details/3" className="link">
          Employees Details
        </Link>
        <p>/</p>
        <p>Edit Employee Details</p>
      </div>
      <div className="page-title">Employee Details</div>

      <div className="edit-employee-details-card">
        <form action="">
          <div className="top">
            {/* Left Side */}
            <div className="left">
              <div className="input">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  defaultValue={firstName || employeeDetails?.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Middle Name</label>
                <input
                  type="text"
                  defaultValue={middleName || employeeDetails?.middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  defaultValue={lastName || employeeDetails?.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  defaultValue={email || employeeDetails?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Phone Number</label>
                <input
                  type="number"
                  defaultValue={phoneNumber || employeeDetails?.phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  defaultValue={address || employeeDetails?.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Date of Birth</label>
                <input
                  type="date"
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Picture</label>
                <input
                  type="file"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
                <img
                  src={`${process.env.REACT_APP_URL}/images/employees/${employeeDetails?.profilePic}`}
                  alt=""
                  style={{ height: 150, width: 150, objectFit: "cover" }}
                />
              </div>

              {/* <div className="input">
                <label htmlFor="">Next of Kin</label>
                <input type="text" />
              </div>

              <div className="input">
                <label htmlFor="">Referee 1</label>
                <input type="text" />
              </div>

              <div className="input">
                <label htmlFor="">Referee 2</label>
                <input type="text" />
              </div>

              <div className="input">
                <label htmlFor="">Referee 3</label>
                <input type="text" />
              </div> */}
            </div>

            {/* right side */}
            <div className="right">
              <div className="input">
                <label htmlFor="">Employment date</label>
                <input
                  type="date"
                  onChange={(e) => setEmploymentDate(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Salary (Monthly)</label>
                <input
                  type="number"
                  defaultValue={monthlySalary || employeeDetails?.salary}
                  onChange={(e) => setMonthlySalary(e.target.value)}
                />
              </div>

              {/* <div className="input">
                <label htmlFor="">Salary (Annually)</label>
                <input type="number" />
              </div> */}

              <div className="input">
                <label htmlFor="">Department</label>
                <select
                  name=""
                  id=""
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option
                    value="Admin"
                    selected={
                      employeeDetails?.department === "Admin" ? true : false
                    }
                  >
                    Admin
                  </option>
                  <option
                    value="Marketing"
                    selected={
                      employeeDetails?.department === "Marketing" ? true : false
                    }
                  >
                    Marketing
                  </option>
                  <option
                    value="Customer Relation"
                    selected={
                      employeeDetails?.department === "Customer Relation"
                        ? true
                        : false
                    }
                  >
                    Customer Relation
                  </option>
                  <option
                    value="Logistics"
                    selected={
                      employeeDetails?.department === "Logistics" ? true : false
                    }
                  >
                    Logistics
                  </option>
                  <option
                    value="Security"
                    selected={
                      employeeDetails?.department === "Security" ? true : false
                    }
                  >
                    Security
                  </option>
                  <option
                    value="Engineering"
                    selected={
                      employeeDetails?.department === "Engineering"
                        ? true
                        : false
                    }
                  >
                    Engineering
                  </option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="">Position</label>
                <select
                  name=""
                  id=""
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option
                    value="HRM"
                    selected={
                      employeeDetails?.position === "HRM" ? true : false
                    }
                  >
                    Human Resource manager
                  </option>
                  <option
                    value="Technician"
                    selected={
                      employeeDetails?.position === "Technician" ? true : false
                    }
                  >
                    Technician
                  </option>
                  <option
                    value="Marketer"
                    selected={
                      employeeDetails?.position === "Marketer" ? true : false
                    }
                  >
                    Marketer
                  </option>
                  <option
                    value="Customer Service"
                    selected={
                      employeeDetails?.position === "Customer Service"
                        ? true
                        : false
                    }
                  >
                    Customer Service
                  </option>
                  <option
                    value="Driver"
                    selected={
                      employeeDetails?.position === "Driver" ? true : false
                    }
                  >
                    Driver
                  </option>
                  <option
                    value="Courier"
                    selected={
                      employeeDetails?.position === "Courier" ? true : false
                    }
                  >
                    Courier/Delivery
                  </option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="">Employment Status</label>
                <select
                  name=""
                  id=""
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                >
                  <option
                    value="Active"
                    selected={
                      employeeDetails?.employmentStatus === "Active"
                        ? true
                        : false
                    }
                  >
                    Active
                  </option>
                  <option
                    value="Suspended"
                    selected={
                      employeeDetails?.employmentStatus === "Suspended"
                        ? true
                        : false
                    }
                  >
                    Suspended
                  </option>
                  <option
                    value="Resigned"
                    selected={
                      employeeDetails?.employmentStatus === "Resigned"
                        ? true
                        : false
                    }
                  >
                    Resigned
                  </option>
                  <option
                    value="Dismissed"
                    selected={
                      employeeDetails?.employmentStatus === "Dismissed"
                        ? true
                        : false
                    }
                  >
                    Dismissed
                  </option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="">Employment Type</label>
                <select
                  name=""
                  id=""
                  onChange={(e) => setEmploymentType(e.target.value)}
                >
                  <option
                    value="Staff"
                    selected={
                      employeeDetails?.employmentType === "Staff" ? true : false
                    }
                  >
                    Staff
                  </option>
                  <option
                    value="Intern"
                    selected={
                      employeeDetails?.employmentType === "Intern"
                        ? true
                        : false
                    }
                  >
                    Intern
                  </option>
                  <option
                    value="Contract"
                    selected={
                      employeeDetails?.employmentType === "Contract"
                        ? true
                        : false
                    }
                  >
                    Contract
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="bottom">
            <button disabled={isLoading} onClick={editEmployee}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeDetails;
