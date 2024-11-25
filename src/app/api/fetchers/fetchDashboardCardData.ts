import { apiClient } from "@/app/api/apiClient";
import { toast } from "react-hot-toast";
import { FetchCardsDataProps } from "../interfaces/props/FetchDashboardCardDataProps";

export const fetchCardsData = async ({
  setCardsData,
  setError,
  setLoading,
  onNavigate,
}: FetchCardsDataProps) => {
  try {
    setLoading(true);

    const response = await apiClient.get("/dashboard/cards");
    setCardsData(response.data.data);
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 403) {
        onNavigate("/auth/login");
        toast.error("You need to login first");
      } else {
        setError(
          `Error: ${err.response.status} - ${
            err.response.data.message || "Failed to fetch cards"
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
