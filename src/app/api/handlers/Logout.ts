"use client";

import ToastManager from "@/utils/toastManager";
import { useRouter } from "next/navigation";
import { apiClient } from "../apiClient";

// Handle logout
export const handleLogout = async ({ setLoading }: any, {}) => {
  const router = useRouter();

  setLoading(true);
  try {
    const response = await apiClient.post("/user/logout");
    if (response?.status === 200) {
      router.push("/auth/login");
      ToastManager.toast({
        title: "Success",
        description: "User logged out successfully",
        variant: "success"
      });
    } else {
      console.error("Logout failed", response);
      ToastManager.toast({
        title: "Failed",
        description: "Logout failed",
        variant: "error"
      });
    }
  } catch (error) {
    console.error("Error during logout", error);
  } finally {
    setLoading(false);
  }
};
