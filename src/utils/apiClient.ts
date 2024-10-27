import axios from "axios";
import toast from "react-hot-toast";

// Create Axios instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variable for the base URL
  withCredentials: true, // This will ensure cookies (access and refresh tokens) are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors for handling token expiration and refresh
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh logic when a 401 Unauthorized response occurs
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/refresh-token`,
          null,
          {
            withCredentials: true,
          }
        );

        if (refreshResponse.status === 200) {
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Show a toast notification on refresh token failure
        toast.error("Session expired. Please login again.");

        // Use window.location.href to redirect to login page
        window.location.href = "/auth/login"; // Redirect user to login on refresh token failure
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
