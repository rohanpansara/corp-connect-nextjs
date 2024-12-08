"use client";

import { fetchLeftCardsData } from "@/app/api/fetchers/fetchLowerLeftCardsData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LeftSideCards from "../LeftSideCards";

interface LeaveDetailsCard {
  title: string;
  value: string;
  description: string;
}

interface ShiftDetailsCard {
  title: string;
  value: string;
  description: string;
}

interface MonthlyAttendanceCard {
  title: string;
  value: string;
  description: string;
  totalValue: string;
  absent: boolean;
}

interface CardsData {
  leaveDetailsCard: LeaveDetailsCard;
  shiftDetailsCard: ShiftDetailsCard;
  monthlyAttendanceCard: MonthlyAttendanceCard;
}

const LeftSideCardsWrapper = () => {
  const router = useRouter();
  const handleNavigation = (path: string) => router.push(path);

  const [cardsData, setCardsData] = useState<CardsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeftCardsData({
      setCardsData,
      setError,
      setLoading,
      onNavigate: handleNavigation,
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return cardsData ? <LeftSideCards cardsData={cardsData} /> : null;
};

export default LeftSideCardsWrapper;
