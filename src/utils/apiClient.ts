// pages/api/utils/apiClient.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8089/api/auth', // Your Spring Boot backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for token handling (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);
