import axios from "axios";

export const caxios = axios.create({
  baseURL: `https://cs-admin-689104601634.asia-northeast3.run.app/`
});

//모든 일반 api 호출
caxios.interceptors.request.use((config) => {
  if (!config.headers["Authorization"]) {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});