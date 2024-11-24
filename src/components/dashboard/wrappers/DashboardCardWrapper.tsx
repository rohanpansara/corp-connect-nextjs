"use client"

import { useRouter } from "next/navigation";
import DashboardCards from "../DashboardCards";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/api/apiClient";
import toast from "react-hot-toast";

const DashboardCardsWrapper = () => {
    const router = useRouter();
  
    const [cardsData, setCardsData] = useState<{ [key: string]: any } | null>(
      null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    const fetchCardsData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/dashboard/cards");
        setCardsData(response.data.data);
      } catch (err: any) {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            router.push("/auth/login");
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
  
    useEffect(() => {
      fetchCardsData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div className="text-red-500">{error}</div>;
    }
  
    return cardsData ? <DashboardCards cardsData={cardsData} /> : null;
  };
  
  export default DashboardCardsWrapper;
  