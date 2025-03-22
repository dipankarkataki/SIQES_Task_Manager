import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:8000/admin", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
