"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AttendanceAverageCardDTO } from "@/contracts/interfaces/CardDataDTO";
import { useState } from "react";
import AttendanceToggleButtons from "./AttendanceToggle";

interface RightSideCardsProps {
  data: {
    dailyAttendanceCard: AttendanceAverageCardDTO;
    weeklyAttendanceCard: AttendanceAverageCardDTO;
  };
}

const RightSideCards = ({ data }: RightSideCardsProps) => {
  const { dailyAttendanceCard, weeklyAttendanceCard } = data;
  const [active, setActive] = useState<"daily" | "weekly">("daily");

  const activeCard =
    active === "daily" ? dailyAttendanceCard : weeklyAttendanceCard;

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
      <CardFooter className="p-1 w-full text-xs flex justify-center items-center uppercase">
        <span className={`p-[2px] px-1 text-xs rounded-lg uppercase ${activeCard?.onTime === true ? "bg-green-200 dark:bg-green-700 border-[1px] text-green-700 dark:text-green-200 border-green-700 dark:border-green-200" : "bg-red-200 dark:bg-red-600 border-[1px] text-red-600 dark:text-red-200 border-red-600 dark:border-red-200"}`}>
          {activeCard?.description}
        </span>
        &nbsp;{active === "daily" ? "today" : "this week"}  
      </CardFooter>
    </Card>
  );
};

export default RightSideCards;
