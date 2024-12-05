"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RightSideCards from "../RightSideCards";
import { apiClient } from "@/app/api/apiClient";

interface CardDataDTO {
  title: string;
  value: string;
  description: string;
}

interface RightSideCardsDTO {
  dailyAttendanceCard: CardDataDTO;
  weeklyAttendanceCard: CardDataDTO;
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
