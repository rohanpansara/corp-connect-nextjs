"use client";

import { fetchLowerLeftCardsData } from "@/app/api/fetchers/fetchLowerLeftCardsData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LowerLeftCards from "../LowerLeftCards";

const LowerLeftCardsWrapper = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => router.push(path);

  const [cardsData, setCardsData] = useState<{ [key: string]: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLowerLeftCardsData({
      setCardsData,
      setError,
      setLoading,
      onNavigate: handleNavigation,
    });
  }, []);

  return cardsData ? <LowerLeftCards cardsData={cardsData} /> : null;
};

export default LowerLeftCardsWrapper;
