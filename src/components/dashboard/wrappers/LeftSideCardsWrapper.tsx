"use client";

import { fetchLeftCardsData } from "@/app/api/fetchers/fetchLeftCardsData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LeftSideCards from "../LeftSideCards";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (!cardsData) {
    return (
      <div className="w-1/2 h-full gap-1 flex flex-col">
        <div className="w-full flex h-1/2 gap-1">
          <Skeleton className="w-1/2 h-full" />
          <Skeleton className="w-1/2 h-full" />
        </div>
        <div className="w-full flex h-1/2">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    );
  }

  return cardsData ? <LeftSideCards cardsData={cardsData} /> : null;
};

export default LeftSideCardsWrapper;
