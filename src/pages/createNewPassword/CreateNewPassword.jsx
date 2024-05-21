import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../main.scss";
import "./createNewPassword.scss";
import { useState } from "react";
import axios from "axios";

const CreateNewPassword = () => {
  document.title = "Blikonn - Create new password";
  const resetCode = useLocation().pathname.split("/")[2];
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      resetCode: resetCode,
      newPassword: confirmPassword,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/auth/createNewPassword`,
        data
      );
      console.log(res.data);
      setIsLoading(false);
      setInfo(res.data);

      //Send user to login page
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(error.response.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="content">
        <div className="header">
          <h3>Create New Password</h3>
          {/* <p>Enter your email below to receive an OTP</p> */}
          <p style={{ color: "red", marginTop: 10 }}>{error && error}</p>
          <p style={{ color: "green", marginTop: 10 }}>{info && info}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password !== confirmPassword ? (
              <p style={{ color: "#df0404", marginTop: 10 }}>
                Passwords does not match!
              </p>
            ) : (
              ""
            )}
          </div>

          {/* <button className="loading-indicator">Creating Account...</button> */}
          {isLoading ? (
            <button className="loading-indicator" disabled>
              Creating new password...
            </button>
          ) : (
            <button>Update Password</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;
