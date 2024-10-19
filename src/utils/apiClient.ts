import axios from 'axios';

// Create Axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variable for the base URL
  withCredentials: true, // This will ensure cookies (access and refresh tokens) are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for handling token expiration and refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh logic when a 401 Unauthorized response occurs
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Make a request to the token refresh endpoint; cookies will automatically be sent by the browser
        const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`, null, {
          withCredentials: true,
        });

        if (refreshResponse.status === 200) {
          // Retry the original request with the new token (which is now set in cookies)
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
