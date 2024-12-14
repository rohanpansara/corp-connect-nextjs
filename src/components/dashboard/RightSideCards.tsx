"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AttendanceAverageCardDTO } from "@/contracts/interfaces/CardDataDTO";
import { useState } from "react";
import { Button } from "../ui/button";
import { GoArrowUpRight } from "react-icons/go";

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
    <div className="w-1/2 h-full flex gap-1 rounded-md overflow-hidden">
      <div className="w-1/2 h-full rounded-md">
        <Card className="h-full flex flex-col p-2 border-none bg-cardBackgroundColor rounded-md">
          <CardHeader className="p-2">
            <div className="flex justify-between items-center w-full">
              <div className="w-1/2 text-xs text-gray-600">Average Hours</div>
              <div className="w-1/2 h-[26px] bg-mainBackground text-center rounded-sm flex justify-between items-center overflow-hidden p-1 gap-1">
                <Button
                  size="nothing"
                  variant="plain"
                  className={`w-1/2 text-[9px] text-gray-600 rounded-sm flex justify-center items-center 
                    ${
                      active === "daily"
                        ? "bg-cardTextColor text-gray-100 shadow-lg h-[20px]"
                        : "h-[10px] bg-gray-100"
                    }`}
                  onClick={() => setActive("daily")}
                >
                  Today
                </Button>
                <Button
                  size="nothing"
                  variant="plain"
                  className={`w-1/2 text-[10px] text-gray-600 rounded-sm flex justify-center items-center ${
                    active === "weekly"
                      ? "bg-cardTextColor text-gray-100 shadow-lg h-[20px]"
                      : "h-[10px] bg-gray-100"
                  }`}
                  onClick={() => setActive("weekly")}
                >
                  Weekly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-0 px-2">
            {/* show dailyAttendanceCard.value here */}
            {data?.dailyAttendanceCard?.value}
          </CardContent>
          <CardFooter className="p-2">
            <div className="flex justify-center items-center w-full text-xs">
              {/* show dailyAttendanceCard.description here */}
              {data?.dailyAttendanceCard?.description}
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="w-1/2 h-full rounded-md">
        <Card className="h-full flex flex-col p-4 border-none bg-cardBackgroundColor rounded-md">
          <CardContent className="flex-grow p-0 flex flex-col space-y-1">
            <div className="flex-1 bg-mainBackground rounded-sm"></div>
            <div className="flex-1 bg-mainBackground rounded-sm"></div>
            <div className="flex-[0.3] rounded-sm flex justify-center items-center text-xs pt-1">
              <Button
                size="nothing"
                variant="plain"
                className="pl-1 font-normal text-xs text-cardTextColor hover:text-cardTextColorDark"
              >
                <GoArrowUpRight />
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RightSideCards;
