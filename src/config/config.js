import axios from "axios";

export const caxios = axios.create({
  baseURL: `http://10.5.5.4:85/`
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