// fetchUsersData.ts

import { toast } from "react-hot-toast";
import { apiClient } from "@/app/api/apiClient";

interface FetchUsersDataProps {
  setUsersData: React.Dispatch<React.SetStateAction<any[]>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate: (path: string) => void; // Callback function for navigation
}

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
    } else {
      setError("No data found");
    }
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 403) {
        onNavigate("/auth/login");
        toast.error("You need to log in first");
      } else {
        setError(`Error: ${err.response.status} - ${err.response.data.message || "Failed to fetch users data"}`);
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
