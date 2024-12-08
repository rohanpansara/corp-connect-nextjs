"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { IoCalendarOutline } from "react-icons/io5";
import { LuCalendar, LuCalendarClock } from "react-icons/lu";
import { PiTornadoThin } from "react-icons/pi";

type CardsProps = {
  cardsData: { [key: string]: any };
};

const LeftSideCards = ({ cardsData }: CardsProps) => {
  const iconClassName = "h-[50px] w-[50px] text-[#2CA58D] dark:text-[#cfe2e2]";

  type CardTitle = "Leaves Available" | "Shift Timings";

  const iconMap: Record<CardTitle, JSX.Element> = {
    "Leaves Available": <LuCalendar className={iconClassName} />,
    "Shift Timings": <LuCalendarClock className={iconClassName} />,
  };

  return (
    <>
      <div className="w-1/2 h-full flex flex-col gap-1 rounded-md overflow-hidden">
          <div className="w-full h-1/2 gap-1 flex overflow-hidden">
            <div className="w-1/2 h-full rounded-sm rounded-tl-md">
              <Card className="h-full w-full overflow-hidden p-4 border-none bg-cardBackgroundColor rounded-md text-left">
                <CardContent className="p-0 h-full flex flex-row items-center justify-around">
                  <CardDescription className="p-0 pr-2 flex">
                    <span>
                      <IoCalendarOutline className={iconClassName} />
                    </span>
                  </CardDescription>
                  <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-cardTextColor">
                    <span className="text-[16px] font-extrabold cursor-default">
                      7h 30m
                    </span>
                    <span className="text-[10px]">Shift Timings</span>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <div className="w-1/2 h-full rounded-sm rounded-tr-md">
              <Card className="h-full w-full overflow-hidden p-4 border-none bg-cardBackgroundColor rounded-md text-left">
                <CardContent className="p-0 h-full flex flex-row items-center justify-around">
                  <CardDescription className="p-0 pr-2 flex">
                    <span>
                      <IoCalendarOutline className={iconClassName} />
                    </span>
                  </CardDescription>
                  <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-cardTextColor">
                    <span className="text-[16px] font-extrabold cursor-default">
                      7h 30m
                    </span>
                    <span className="text-[10px]">Shift Timings</span>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
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
                      7h 30m
                    </span>
                    <span className="text-[10px]">Shift Timings</span>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </>
  );
};

export default LeftSideCards;
