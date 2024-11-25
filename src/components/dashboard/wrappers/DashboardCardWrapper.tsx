"use client";

import { apiClient } from "@/app/api/apiClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashboardCards from "../DashboardCards";
import { fetchCardsData } from "@/app/api/fetchers/fetchDashboardCardData";

const DashboardCardsWrapper = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => router.push(path);

  const [cardsData, setCardsData] = useState<{ [key: string]: any } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCardsData({
      setCardsData,
      setError,
      setLoading,
      onNavigate: handleNavigation,
    });
  }, []);

  return cardsData ? <DashboardCards cardsData={cardsData} /> : null;
};

export default DashboardCardsWrapper;
