// src/utils/apiClient.ts
import axios from 'axios';
import { getClientCookies } from './cookies'; // Use the client-side function

// Create Axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for token handling
apiClient.interceptors.request.use(
  (config) => {
    // Access cookies using getClientCookies
    const cookies = getClientCookies(); // Use the new client-side function
    const accessToken = cookies['accessToken']; // Ensure correct key name

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Access refreshToken from cookies
        const cookies = getClientCookies(); // Use the new client-side function
        const refreshToken = cookies['refreshToken']; // Ensure correct key name

        const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`, { refreshToken });

        const newAccessToken = refreshResponse.data.accessToken;

        // Update cookies (this should happen in your component where you call this API)
        // You will need to set the cookie in the component using `setCookie`

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
