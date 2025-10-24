// src/utils/axios.js
import axios from "axios";

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

export default AGENTAPI;
