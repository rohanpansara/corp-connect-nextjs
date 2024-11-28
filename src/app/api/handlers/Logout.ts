"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiClient } from "../apiClient";

// Handle logout
export const handleLogout = async ({ setLoading }: any, {}) => {
  const router = useRouter();
  setLoading(true);
  try {
    const response = await apiClient.post("/user/logout");
    if (response?.status === 200) {
      router.push("/auth/login");
      toast.success(response?.data?.message || "Logged Out");
    } else {
      console.error("Logout failed", response);
    }
  } catch (error) {
    console.error("Error during logout", error);
  } finally {
    setLoading(false);
  }
};
