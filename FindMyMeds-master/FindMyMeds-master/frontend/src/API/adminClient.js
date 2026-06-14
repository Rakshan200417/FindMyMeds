import axios from "axios";

const adminClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://findmymeds-production.up.railway.app/",
  timeout: 20000,
});

adminClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("pharmacyToken") ||
      localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default adminClient;
