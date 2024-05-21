import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [authToken, setAuthToken] = useState(
    JSON.parse(localStorage.getItem("authToken")) || null
  );

  // Logout
  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}/auth/logout`);
      setLoggedInUser(null);
      setAuthToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  // login
  const login = async (inputs) => {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/auth/login`,
      inputs,
      { withCredentials: true }
    );

    setLoggedInUser(res.data.userData);
    setAuthToken(res.data.jwtToken);
  };

  //console.log({ userData: loggedInUser, authToken: authToken });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  useEffect(() => {
    localStorage.setItem("authToken", JSON.stringify(authToken));
  }, [authToken]);

  //Get user details
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    if (!loggedInUser || !loggedInUser.userId) {
      setUserDetails([]); // Reset userDetails if loggedInUser is null or userId is falsy
      return; // Return early to avoid making unnecessary requests
    }

    const cancelToken = axios.CancelToken.source();

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_URL}/users/loggedInUser/${loggedInUser.userId}`,
          {
            cancelToken: cancelToken.token,
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${authToken}`, // Set the Authorization header with the token
            },
          }
        );
        setUserDetails(res.data[0]);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request Cancelled!");
        } else {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();

    return () => {
      cancelToken.cancel(); // Cancel the request when the component unmounts
    };
  }, [loggedInUser, authToken]); // Dependency array includes loggedInUser

  return (
    <AuthContext.Provider
      value={{ loggedInUser, userDetails, authToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
