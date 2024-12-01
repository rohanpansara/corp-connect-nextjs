import { apiClient } from "@/app/api/apiClient";

export const checkSession = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get("/user/validate-token");
    return response.status === 200;
  } catch (error) {
    console.error("Error during session validation:", error);
    return false;
  }
};
