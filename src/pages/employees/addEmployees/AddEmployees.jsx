import "./addEmployees.scss";
import { Link, useNavigate } from "react-router-dom";

import { FaRegCopy } from "react-icons/fa";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authContext";

const AddEmployees = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Generate Passord
  const [strongPass, setStrongPass] = useState("");
  const generatePassword = () => {
    function generateRandomString(length) {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%&*();^";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
      }
      return result;
    }

    setStrongPass(generateRandomString(20));
  };

  // Copy text to clipboard
  const [copyPassword, setCopyPassword] = useState(false);
  const copyGeneratedPassword = async () => {
    try {
      await navigator.clipboard.writeText(strongPass);
      setCopyPassword("Password copied to clipboard!");
      setTimeout(() => {
        setCopyPassword(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Add employee
  const [isLoading, setIsloading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [picture, setPicture] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const addEmployee = async (e) => {
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
      password,
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
    <div className="add-employees">
      <div className="breadcrumbs">
        <Link to="/employees" className="link">
          Employees
        </Link>
        <p>/</p>
        <p>Add Employees</p>
      </div>

      <div className="page-top">
        <div className="page-title">Add Employee</div>
        <div className="generatePassword">
          {copyPassword && <div className="copiedPass">{copyPassword}</div>}
          <div className="password">
            {strongPass && strongPass}{" "}
            {strongPass && (
              <FaRegCopy onClick={copyGeneratedPassword} className="icon" />
            )}
          </div>
          <button className="button" onClick={generatePassword}>
            Generate Password
          </button>
        </div>
      </div>

      <div className="add-employees-card">
        <form action="">
          <div className="top">
            {/* Left Side */}
            <div className="left">
              <div className="input">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Middle Name</label>
                <input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Phone Number</label>
                <input
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Date of Birth</label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Picture</label>
                <input
                  type="file"
                  onChange={(e) => setPicture(e.target.files[0])}
                />
              </div>
            </div>

            {/* right side */}
            <div className="right">
              <div className="input">
                <label htmlFor="">Employment date</label>
                <input
                  type="date"
                  value={employmentDate}
                  onChange={(e) => setEmploymentDate(e.target.value)}
                />
              </div>

              <div className="input">
                <label htmlFor="">Salary (Monthly)</label>
                <input
                  type="number"
                  value={monthlySalary}
                  onChange={(e) => setMonthlySalary(e.target.value)}
                />
              </div>

              {/* <div className="input">
                <label htmlFor="">Salary (Annually)</label>
                <input
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(e.target.value)}
                />
              </div> */}

              <div className="input">
                <label htmlFor="">Department</label>
                <select
                  name=""
                  id=""
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="Admin" selected>
                    Admin
                  </option>
                  <option value="Marketing">Marketing</option>
                  <option value="Customer Relation">Customer Relation</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Security">Security</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="">Position</label>
                <select
                  name=""
                  id=""
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="HRM" selected>
                    Human Resource manager
                  </option>
                  <option value="Technician">Technician</option>
                  <option value="Marketer">Marketer</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Driver">Driver</option>
                  <option value="Courier">Courier/Delivery</option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="">Employment Status</label>
                <select
                  name=""
                  id=""
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                >
                  <option value="Active" selected>
                    Active
                  </option>
                  <option value="Suspended">Suspended</option>
                  <option value="Resigned">Resigned</option>
                  <option value="Dismissed">Dismissed</option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="">Employment Type</label>
                <select
                  name=""
                  id=""
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                >
                  <option value="Staff" selected>
                    Staff
                  </option>
                  <option value="Intern">Intern</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bottom">
            {isLoading ? (
              <button disabled={isLoading}>Please wait...</button>
            ) : (
              <button onClick={addEmployee}>Add Employee</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployees;
