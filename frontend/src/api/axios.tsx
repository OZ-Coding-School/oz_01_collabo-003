import axios from "axios";

const request = axios.create({
  baseURL: "https://6907-122-32-46-97.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default request;
