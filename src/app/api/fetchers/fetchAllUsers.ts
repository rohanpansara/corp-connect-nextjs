import { apiClient } from "@/app/api/apiClient";
import ToastManager from "@/utils/toastManager";
import { FetchUsersDataProps } from "../interfaces/props/FetchUserDataProps";

export const fetchUsersData = async ({
  setUsersData,
  setError,
  setLoading,
  onNavigate,
}: FetchUsersDataProps) => {

  setLoading(true);

  try {
    const response = await apiClient.get("/employee");

    if (response.data?.data) {
      setUsersData(response.data.data);
      ToastManager.toast({
        title: "Loading",
        description:
          "Fetching user records",
        variant: "loading",
        action: {
          altText: "Token Refresh Failed",
          onClick: () => {},
          label: "Token Refresh",
        },
      });

      ToastManager.toast({
        title: "Success",
        description:
          "User records fetched successfully",
        variant: "success",
        action: {
          altText: "Token Refresh Failed",
          onClick: () => {},
          label: "Token Refresh",
        },
      });

    } else {
      setError("No data found");
    }
  } catch (err: any) {

    if (err.response) {
      if (err.response.status == 401 || err.response.status == 403) {
        onNavigate("/auth/login");
        ToastManager.toast({
          title: "You are not logged in",
          description: err.response,
          variant: "error",
          action: {
            altText: "Token Refresh Failed",
            onClick: () => {},
            label: "Token Refresh",
          },
        });
      } else if (err.response.status == 500) {
        ToastManager.toast({
          title: "You don't have access to this record",
          description: err.response,
          variant: "error",
          action: {
            altText: "Token Refresh Failed",
            onClick: () => {},
            label: "Token Refresh",
          },
        });
      } else {
        setError(
          `Error: ${err.response.status} - ${
            err.response.data.message || "Failed to fetch users data"
          }`
        );
      }
    } else if (err.request) {
      setError("Network error: Failed to receive a response");
    } else {
      setError(`Error: ${err.message}`);
    }
  } finally {
    setLoading(false);
  }
};
