// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/apiClient";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiClient.get("/user/validate-token"); // Endpoint to validate token
        setIsAuthenticated(response.status === 200); // Set true if token is valid
      } catch (error) {
        setIsAuthenticated(false); // Set false if any error occurs
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated; // Return the authentication status
};

export default useAuth;
