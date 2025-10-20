import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.VITE_API_URL || "https://api.example.com",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
