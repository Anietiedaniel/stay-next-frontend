// src/utils/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://stay-next-auth-service-3.onrender.com/api",
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
  baseURL: "http://localhost:4000/api",
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
