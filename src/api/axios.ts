/**
 * Axios API Instance
 * ------------------
 * Centralized Axios configuration for all HTTP requests.
 * Automatically attaches JWT token to authorized requests.
 */

import axios from "axios";

/**
 * Create Axios instance
 */
export const api = axios.create({
  // Base URL for backend API
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/api",
  timeout: 10000, // Optional: request timeout (10s)
});

/**
 * Request interceptor
 * Attaches Authorization header if token exists
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
