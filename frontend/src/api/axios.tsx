import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    // "ngrok-skip-browser-warning": "69420",
  },
  withCredentials: true,
});
export default request;
