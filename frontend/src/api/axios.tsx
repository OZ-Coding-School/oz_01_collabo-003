import axios from "axios";

const request = axios.create({
  baseURL: "https://www.3eng.store",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const response = await axios.post(
      "http://www.3eng.store/api/v1/user/auth/refresh/",
      {
        refresh: localStorage.getItem("refreshToken"),
      }
    );
    const newAccessToken = response.data.access;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.log("리프레시 토큰 에러", error);
    throw error;
  }
};

request.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        const newAccessToken = await refreshToken();
        originalRequest._retry = true;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return request(originalRequest);
      } catch (error) {
        console.log("리프레시 토큰 에러", error);
        throw error;
      }
    }
    return Promise.reject(error);
  }
);

export default request;
