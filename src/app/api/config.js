import axios from "axios";

const api = axios.create({
  baseURL:
    "https://prescription-platform-backend.vercel.app" || process.env.BACKEND_BASEURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem("AuthToken");
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
      req.headers["Content-Type"]="application/json"
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
