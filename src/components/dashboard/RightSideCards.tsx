"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import AttendanceToggleButtons from "./AttendanceToggle";

interface CardDataDTO {
  title: string;
  value: string;
  description: string;
}

interface RightSideCardsProps {
  data: {
    dailyAttendanceCard: CardDataDTO;
    weeklyAttendanceCard: CardDataDTO;
  };
}

const RightSideCards = ({ data }: RightSideCardsProps) => {
  const { dailyAttendanceCard, weeklyAttendanceCard } = data;
  const [active, setActive] = useState<"daily" | "weekly">("daily");

  const activeCard = active === "daily" ? dailyAttendanceCard : weeklyAttendanceCard;

  return (
    <Card className="w-1/2 h-[216px] p-2 bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md">
      <CardHeader className="flex flex-row justify-between items-center p-1">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-800">
          {activeCard?.title}
        </span>
        <div className="flex items-center w-[100px] border-[1px] overflow-hidden border-gray-600 dark:border-gray-300 rounded-[4px]">
          <AttendanceToggleButtons active={active} setActive={setActive} />
        </div>
      </CardHeader>
      <CardContent className="h-[70%] pb-0 w-full flex items-center justify-center">
        <CardDescription className="h-full flex justify-center items-center">
          <div className="w-full flex justify-center items-center">
            <span className="font-bold xl:text-7xl lg:text-6xl md:text-3xl sm:text-xl text-gray-600 dark:text-gray-800">
              {activeCard?.value}
            </span>
          </div>
        </CardDescription>
      </CardContent>
      <CardFooter className="p-1 w-full flex justify-center items-center">
        <span className="text-xs text-gray-600 dark:text-gray-800">{activeCard?.description}</span>
      </CardFooter>
    </Card>
  );
};

export default RightSideCards;
