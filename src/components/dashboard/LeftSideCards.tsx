"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { IoCalendarOutline } from "react-icons/io5";
import { LuCalendar, LuCalendarClock } from "react-icons/lu";

type CardsProps = {
  cardsData: {
    leaveDetailsCard: { title: string; value: string; description: string };
    shiftDetailsCard: { title: string; value: string; description: string };
    monthlyAttendanceCard: {
      title: string;
      value: string;
      description: string;
      totalValue: string;
      absent: boolean;
    };
  };
};

const LeftSideCards = ({ cardsData }: CardsProps) => {
  const iconClassName = "h-[50px] w-[50px] text-cardTextColor";

  return (
    <div className="w-1/2 h-full flex flex-col gap-1 rounded-md overflow-hidden">
      {/* Top Row */}
      <div className="w-full h-1/2 gap-1 flex overflow-hidden">
        {/* Leave Details Card */}
        <div className="w-1/2 h-full rounded-sm rounded-tl-md">
          <Card className="h-full w-full overflow-hidden p-4 border-none bg-cardBackgroundColor rounded-md text-left">
            <CardContent className="p-0 h-full flex flex-row items-center justify-around">
              <CardDescription className="p-0 pr-2 flex">
                <span>
                  <LuCalendar className={iconClassName} />
                </span>
              </CardDescription>
              <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-cardTextColor">
                <span className="text-[16px] font-extrabold cursor-default">
                  {cardsData.leaveDetailsCard.value}
                </span>
                <span className="text-[10px]">
                  {cardsData.leaveDetailsCard.title}
                </span>
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Shift Details Card */}
        <div className="w-1/2 h-full rounded-sm rounded-tr-md">
          <Card className="h-full w-full overflow-hidden p-4 border-none bg-cardBackgroundColor rounded-md text-left">
            <CardContent className="p-0 h-full flex flex-row items-center justify-around">
              <CardDescription className="p-0 pr-2 flex">
                <span>
                  <LuCalendarClock className={iconClassName} />
                </span>
              </CardDescription>
              <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-cardTextColor">
                <span className="text-[16px] font-extrabold cursor-default">
                  {cardsData.shiftDetailsCard.value}
                </span>
                <span className="text-[10px]">
                  {cardsData.shiftDetailsCard.title}
                </span>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="w-full h-1/2 gap-1 flex overflow-hidden">
        <div className="w-full h-full rounded-md">
          <Card className="h-full w-full overflow-hidden p-4 border-none bg-cardBackgroundColor rounded-md text-left">
            <CardContent className="p-0 h-full flex flex-row items-center justify-around">
              <CardDescription className="p-0 pr-2 flex">
                <span>
                  <IoCalendarOutline className={iconClassName} />
                </span>
              </CardDescription>
              <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-cardTextColor">
                <span className="text-[16px] font-extrabold cursor-default">
                  {cardsData.monthlyAttendanceCard.value} /{" "}
                  {cardsData.monthlyAttendanceCard.totalValue}
                </span>
                <span className="text-[10px] font-semibold">
                  {cardsData.monthlyAttendanceCard.title}
                </span>
                <span className="text-[10px]">
                  {cardsData.monthlyAttendanceCard.description}
                </span>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeftSideCards;
