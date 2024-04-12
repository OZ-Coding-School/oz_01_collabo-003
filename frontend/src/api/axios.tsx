import axios from "axios";

const request = axios.create({
  baseURL: "https://853d-211-247-35-153.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
  // withCredentials: true,
});
export default request;
