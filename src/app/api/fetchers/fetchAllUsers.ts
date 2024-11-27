import { apiClient } from "@/app/api/apiClient";
import { FetchUsersDataProps } from "../interfaces/props/FetchUserDataProps";
import { toast } from "sonner";

export const fetchUsersData = async ({
  setUsersData,
  setError,
  setLoading,
  onNavigate,
}: FetchUsersDataProps) => {
  const loadingToastId = toast.loading("Fetching user records");
  setLoading(true);
  
  try {
    const response = await apiClient.get("/employee");
    
    if (response.data?.data) {
      setUsersData(response.data.data);
      toast.dismiss(loadingToastId);
      toast.success("Users found successfully");
    } else {
      setError("No data found");
    }
  } catch (err: any) {
    toast.dismiss(loadingToastId);
    
    if (err.response) {
      if (err.response.status == 401 || err.response.status == 403) {
        onNavigate("/auth/login");
        toast.error("You need to log in first");
      } else if (err.response.status == 500) {
        toast.error("You don't have access to user records!");
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
