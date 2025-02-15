"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AttendanceAverageCardDTO } from "@/contracts/interfaces/CardDataDTO";
import { useState } from "react";
import { BiSolidParty } from "react-icons/bi";
import { GoArrowUpRight } from "react-icons/go";
import { IoVideocam } from "react-icons/io5";
import { ProgressCircle } from "../chart/ProgressCircle";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";

interface RightSideCardsProps {
  data: {
    todayAttendanceCard: AttendanceAverageCardDTO;
    weeklyAttendanceCard: AttendanceAverageCardDTO;
  };
}

const RightSideCards = ({ data }: RightSideCardsProps) => {
  const { todayAttendanceCard, weeklyAttendanceCard } = data;
  const [active, setActive] = useState<"today" | "weekly">("today");

  const activeCard =
    active === "today" ? todayAttendanceCard : weeklyAttendanceCard;

  return (
    <div className="w-1/2 h-full flex gap-1 rounded-md overflow-hidden">
      <div className="w-1/2 h-full rounded-md">
        <Card className="h-full flex flex-col p-2 border-none bg-cardBackgroundColor rounded-md">
          <CardHeader className="p-2">
            <div className="flex justify-between items-center w-full">
              <div className="w-1/2 text-xs text-cardTextColor font-semibold">
                {activeCard?.title}
              </div>
              <div className="w-1/2 h-[25px] bg-mainBackground text-center rounded-[6px] flex justify-between items-center my-auto overflow-hidden py-1 px-[3px]">
                <Button
                  size="nothing"
                  variant="plain"
                  className={`w-1/2 mr-[2px] text-[10px] text-gray-600 dark:text-gray-400 rounded-sm flex justify-center items-center transition-transform
                    ${
                      active === "today"
                        ? "bg-cardTextColor dark:bg-cardBackgroundColor text-gray-100 dark:text-gray-50 shadow-lg h-[20px]"
                        : "h-[10px] bg-mainBackground my-auto"
                    }`}
                  onClick={() => setActive("today")}
                >
                  Today
                </Button>
                <Button
                  size="nothing"
                  variant="plain"
                  className={`w-1/2 ml-[2px] text-[10px] text-gray-600 dark:text-gray-400 rounded-sm flex justify-center items-center transition-transform 
                    ${
                      active === "weekly"
                        ? "bg-cardTextColor dark:bg-cardBackgroundColor text-gray-100 dark:text-gray-50 shadow-lg h-[20px]"
                        : "h-[10px] bg-mainBackground my-auto"
                  }`}
                  onClick={() => setActive("weekly")}
                >
                  Weekly
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow flex justify-center items-center p-0 px-2">
            <ProgressCircle
              min={0}
              value={parseInt(activeCard?.value || "0", 10)}
              max={activeCard?.maxValue || 0}
              strokeWidth={10}
              radius={75}
              variant={
                activeCard?.remainingValue <= 0
                  ? "success"
                  : activeCard?.remainingValue > 0 &&
                    activeCard?.remainingValue <= 1
                  ? "warning"
                  : "error"
              }
              showAnimation
              markerWidth={40}
            >
              <div className="flex justify-center items-center flex-col">
                <span
                  className={`font-bold text-cardTextColor ${
                    activeCard?.remainingValue < 0
                      ? `text-[40px]`
                      : `text-[25px]`
                  }`}
                >
                  {activeCard?.value}
                </span>
                {activeCard?.remainingValue > 0 && (
                  <span
                    className={`p-1 text-[10px] rounded-md ${
                      activeCard?.remainingValue <= 1
                        ? "bg-[#FEF08A] text-[#EAB308] dark:bg-[#EAB308] dark:text-[#FEF08A]"
                        : "bg-[#FECACA] text-[#EF4444] dark:bg-[#EF4444] dark:text-[#FECACA]"
                    }`}
                  >
                    <span className="font-semibold">
                      {activeCard?.remainingValue}
                    </span>{" "}
                    hours left
                  </span>
                )}
              </div>
            </ProgressCircle>
          </CardContent>
        </Card>
      </div>
      <div className="w-1/2 h-full rounded-md">
        <Card className="h-full flex flex-col p-4 border-none bg-cardBackgroundColor rounded-md">
          <CardContent className="flex-grow p-0 flex flex-col space-y-1">
            <div className="flex-1 bg-mainBackground rounded-sm">
              <div className="w-full h-full flex flex-col justify-between text-xs px-2 py-1">
                <div className="flex flex-[0.25] justify-between items-center gap-1 font-semibold">
                  <span className="flex items-center gap-1 font-semibold">
                    <IoVideocam className="text-blue-800" />
                    11:00 AM
                  </span>
                  <span className="font-semibold rounded-full hover:bg-gray-200 hover:cursor-pointer p-1">
                    <GoArrowUpRight />
                  </span>
                </div>
                <div className="flex flex-1 justify-between items-center gap-1">
                  <span className="text-sm">Daily Scrum Meeting</span>
                  <div className="rounded-full bg-gray-600 text-gray-100 p-1">RP</div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-mainBackground rounded-sm">
              <div className="w-full h-full flex flex-col justify-between text-xs px-2 py-1">
                <div className="flex flex-[0.25] justify-between items-center gap-1 font-semibold">
                  <span className="flex items-center gap-1 font-semibold">
                    <BiSolidParty className="text-orange-800" />
                    4:30 PM
                  </span>
                  <span className="font-semibold rounded-full hover:bg-gray-200 hover:cursor-pointer p-1">
                    <GoArrowUpRight />
                  </span>
                </div>
                <div className="flex flex-1 justify-between items-center gap-1">
                  <span className="text-sm">Fun Friday!</span>
                  <div className="rounded-full bg-gray-600 text-gray-100 p-1">RP</div>
                </div>
              </div>
            </div>
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
