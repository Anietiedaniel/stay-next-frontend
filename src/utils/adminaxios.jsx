// src/utils/axios.js
import axios from "axios";

const ADMINAPI = axios.create({
  baseURL: "http://localhost:3001/api/admin", // Adjusted baseURL to match backend route
  withCredentials: true,
});

// Only set JSON header for JSON requests, not globally
ADMINAPI.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default ADMINAPI;
