import "./editEmployeeDetails.scss";
import { Link } from "react-router-dom";

const EditEmployeeDetails = () => {
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
                <input type="text" />
              </div>

              <div className="input">
                <label htmlFor="">Middle Name</label>
                <input type="text" />
              </div>

              <div className="input">
                <label htmlFor="">Last Name</label>
                <input type="text" />
              </div>

              <div className="input">
                <label htmlFor="">Email</label>
                <input type="email" />
              </div>

              <div className="input">
                <label htmlFor="">Phone Number</label>
                <input type="number" />
              </div>

              <div className="input">
                <label htmlFor="">Address</label>
                <input type="text" />
              </div>

              <div className="input">
                <label htmlFor="">Date of Birth</label>
                <input type="date" />
              </div>

              <div className="input">
                <label htmlFor="">Picture</label>
                <input type="file" />
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
                <input type="date" />
              </div>

              <div className="input">
                <label htmlFor="">Salary (Monthly)</label>
                <input type="number" />
              </div>

              <div className="input">
                <label htmlFor="">Salary (Annually)</label>
                <input type="number" />
              </div>

              <div className="input">
                <label htmlFor="">Department</label>
                <select name="" id="">
                  <option value="">Admin</option>
                  <option value="">Marketing</option>
                  <option value="">Customer Service</option>
                  <option value="">Logistics</option>
                  <option value="">Security</option>
                  <option value="">Engineering</option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="">Position</label>
                <select name="" id="">
                  <option value="">Human Resource manager</option>
                  <option value="">Technician</option>
                  <option value="">Driver</option>
                  <option value="">Courier/Delivery</option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="">Employment Status</label>
                <select name="" id="">
                  <option value="">Active</option>
                  <option value="">Suspended</option>
                  <option value="">Resigned</option>
                  <option value="">Dismissed</option>
                </select>
              </div>

              <div className="input">
                <label htmlFor="">Employment Type</label>
                <select name="" id="">
                  <option value="Staff">Staff</option>
                  <option value="Intern">Intern</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bottom">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeDetails;
