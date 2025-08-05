import axios from 'axios';
import { getToken } from '../utils/auth';

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:7177/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to every request
axiosConfig.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle token expiration
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;