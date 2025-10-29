// src/utils/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: " https://proxy-service-0s6s.onrender.com",
  withCredentials: true,
});

// Only set JSON header for JSON requests, not globally
API.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});


const AGENTAPI = axios.create({
  baseURL: " https://proxy-service-0s6s.onrender.com",
  withCredentials: true,
});

// Only set JSON header for JSON requests, not globally
AGENTAPI.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default API;
