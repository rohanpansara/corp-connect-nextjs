"use client";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { PiTornadoThin } from "react-icons/pi";
import { LuCalendar, LuClock3, LuCalendarClock } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { getInitials } from "@/utils/getInitials";

type CardsProps = {
  cardsData: { [key: string]: any };
};

const DashboardCards = ({ cardsData }: CardsProps) => {
  const iconClassName = "h-[50px] w-[50px] text-[#2CA58D] dark:text-[#cfe2e2]";

  type CardTitle = "Leaves Available" | "Today’s Hours" | "Shift Timings";

  const iconMap: Record<CardTitle, JSX.Element> = {
    "Leaves Available": <LuCalendar className={iconClassName} />,
    "Today’s Hours": <LuClock3 className={iconClassName} />,
    "Shift Timings": <LuCalendarClock className={iconClassName} />,
  };

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mr-auto w-[75%] max-w-[75%]">
      {Object.values(cardsData).map((card: any, index: number) => (
        <Card
          key={index}
          className="h-[100px] w-[95%] overflow-hidden p-4 border-none bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md text-left"
        >
          <CardContent className="p-0 h-full flex flex-row items-center justify-around">
            <CardDescription className="p-0 pr-2 flex">
              <span>
                {iconMap[card.title as CardTitle] || (
                  <PiTornadoThin className={iconClassName} />
                )}
              </span>
            </CardDescription>
            <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-[#2CA58D] dark:text-[#cfe2e2]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {card.title === "Next Meeting" ? (
                      <span className="text-[16px] font-extrabold cursor-default">
                        {getInitials(card.value)}
                      </span>
                    ) : (
                      <span className="text-[16px] font-extrabold cursor-default">
                        {card.value}
                      </span>
                    )}
                  </TooltipTrigger>

                  {card.value.length > 12 && (
                    <TooltipContent>
                      <p>{card.value}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <span className="text-[10px]">{card?.title}</span>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
