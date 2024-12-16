"use client";

import { apiClient } from "@/app/api/apiClient";
import { AttendanceAverageCardDTO } from "@/contracts/interfaces/CardDataDTO";
import { useEffect, useState } from "react";
import RightSideCards from "../RightSideCards";

interface RightSideCardsDTO {
  todayAttendanceCard: AttendanceAverageCardDTO;
  weeklyAttendanceCard: AttendanceAverageCardDTO;
}

const RightSideCardsWrapper = () => {
  const [cardData, setCardData] = useState<RightSideCardsDTO | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/dashboard/cards/right");
        console.log(response)
        setCardData(response.data.data);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, []);

  if (!cardData) {
    return <div>Loading...</div>;
  }

  return <RightSideCards data={cardData} />;
};

export default RightSideCardsWrapper;
