import "./adminLogin.scss";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";

const AdminLogin = () => {
  document.title = "Blikonn - Admin Login";
  const { login, loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // If user is logged in already, redirect them back to dashboard
  useEffect(() => {
    const checkLoggedIn = () => {
      if (loggedInUser) {
        navigate("/");
      }
    };
    return checkLoggedIn();
  }, [loggedInUser, navigate]);

  // Log users in
  const [logginIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const inputs = {
      username: username.trim().replace(" ", ""),
      password,
    };

    try {
      setLoggingIn(true);
      await login(inputs);
      navigate("/");
    } catch (error) {
      console.log(error)
      setError(error.response.data);
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="top">
          <p>Login as an admin</p>
          <p
            style={{ color: "#df0404", marginBottom: 10, textAlign: "center" }}
          >
            {error && error}
          </p>
        </div>
        <div className="form">
          <form>
            <div className="input">
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                onChange={(e) =>
                  setUsername(e.target.value.trim().replace(/\s+/g, ""))
                }
              />
            </div>
            <div className="input">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) =>
                  setPassword(e.target.value.trim().replace(/\s+/g, ""))
                }
              />
            </div>

            {logginIn ? (
              <button type="button" style={{ cursor: "progress" }} disabled>
                Login in...
              </button>
            ) : (
              <button onClick={handleLogin}>Login</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
