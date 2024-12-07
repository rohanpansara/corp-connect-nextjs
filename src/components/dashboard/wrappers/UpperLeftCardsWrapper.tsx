"use client";

import { fetchCardsData } from "@/app/api/fetchers/fetchDashboardCardData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UpperLeftCards from "../UpperLeftCards";

const UpperLeftCardsWrapper = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => router.push(path);

  const [cardsData, setCardsData] = useState<{ [key: string]: any } | null>(null);
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

  return cardsData ? <UpperLeftCards cardsData={cardsData} /> : null;
};

export default UpperLeftCardsWrapper;
