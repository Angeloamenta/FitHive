// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL

});

// Interceptor per aggiungere il token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // lo prende sempre aggiornato
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
