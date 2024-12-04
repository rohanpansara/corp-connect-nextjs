import { apiClient } from "@/app/api/apiClient";
import ToastManager from "@/utils/toastManager";

export const handleLoginSubmit = async (
  values: { email: string; password: string },
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onNavigate: (path: string) => void // Callback function for navigation
) => {
  setLoading(true);

  try {
    const response = await apiClient.post("/user/login", values);

    if (response.status === 200) {
      ToastManager.toast({
        title: "Success",
        description: response.data.message,
        variant: "success",
        action: {
          altText: "Token Refresh Successful",
          onClick: () => {},
          label: "Token Refresh",
        },
      });

      // Navigate to the dashboard
      onNavigate("/dashboard");
    }
  } catch (err: any) {
    const errorMessage =
      err?.response?.data?.message ||
      "An unexpected error occurred. Please try again later.";

    if (err.response) {
      if (err.response.status === 401 || err.response.status === 403) {
        onNavigate("/auth/login");
        ToastManager.toast({
          title: "Unauthorized",
          description: "Please log in again",
          variant: "error",
          action: {
            altText: "Login Required",
            onClick: () => {},
            label: "Login Again",
          },
        });
      }
    } else {
      ToastManager.toast({
        title: "Error",
        description: errorMessage,
        variant: "error",
        action: {
          altText: "Retry",
          onClick: () => {},
          label: "Retry",
        },
      });
    }
  } finally {
    setLoading(false);
  }
};