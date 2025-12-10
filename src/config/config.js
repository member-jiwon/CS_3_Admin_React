import axios from "axios";
import useAuthStore from "../store/useAuthStore";

export const caxios = axios.create({
  baseURL: `https://cs-admin-689104601634.asia-northeast3.run.app/`
});

caxios.interceptors.request.use((config) => {
  if (!config.headers["Authorization"]) {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

caxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.data === "TOKEN_EXPIRED")) {
      useAuthStore.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);