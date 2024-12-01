import ToastManager from "@/utils/toastManager";
import axios from "axios";

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
          return apiClient(originalRequest); // Retry the original request
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Show a toast notification on refresh token failure
        ToastManager.toast({
          title: "Error",
          description: "Couldn't refresh token for the user",
          variant: "error",
          action: {
            altText: "Token Refresh Failed",
            onClick: () => {},
            label: "Token Refresh",
          },
        });

        // Redirect user to login on refresh token failure
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
