import axios from "axios";

// Get the base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,  // This will use the value from the .env file
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const register = async (data) => {
  try {
    const response = await api.post("/api/users", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
