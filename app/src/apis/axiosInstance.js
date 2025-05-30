import axios from "axios";
import { SERVER_BASE_URL } from "../consts/api";

const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  withCredentials: true,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log("Refreshing token...");
        await axiosInstance.post("/api/refresh"); 
        return axiosInstance(originalRequest); // retry original request
      } catch (refreshError) {
        // Redirect to login or handle logout
        console.error("Token refresh failed:", refreshError);
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;