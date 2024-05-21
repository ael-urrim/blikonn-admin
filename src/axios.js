import axios from "axios";

// Create an Axios instance for making requests to the API
export const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_URL, // Base URL of the API
  withCredentials: true, // Include credentials such as cookies in requests
});
