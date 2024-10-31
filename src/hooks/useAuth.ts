import { useState, useEffect } from "react";
import { apiClient } from "@/utils/apiClient";

let authCache: boolean | null = null; // Global cache
let authPromise: Promise<void> | null = null; // Prevents duplicate requests

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    authCache
  );
  const [isLoading, setIsLoading] = useState(isAuthenticated === null);

  useEffect(() => {
    if (authCache !== null) {
      // If we have a cached result, skip the request
      setIsAuthenticated(authCache);
      setIsLoading(false);
      return;
    }

    // If a request is already in progress, wait for it
    if (authPromise) {
      authPromise.then(() => {
        setIsAuthenticated(authCache);
        setIsLoading(false);
      });
      return;
    }

    // If no request is in progress, start one
    authPromise = apiClient
      .get("/user/validate-token")
      .then((response) => {
        authCache = response.data.data === "true";
        setIsAuthenticated(authCache);
      })
      .catch(() => {
        authCache = false;
        setIsAuthenticated(false);
      })
      .finally(() => {
        authPromise = null;
        setIsLoading(false);
      });
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;
