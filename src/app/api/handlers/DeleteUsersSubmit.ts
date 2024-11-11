// src/app/api/fetchers/deleteUsers.ts
import { apiClient } from "@/app/api/apiClient";

export const deleteUsers = async (userIds: string[]): Promise<void> => {
  try {
    await apiClient.delete("/employee", {
      data: { userIds }, 
    });
  } catch (error) {
    console.error("Error deleting users:", error);
    throw error;
  }
};
