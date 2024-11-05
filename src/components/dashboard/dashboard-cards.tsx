"use client";

import { useEffect, useRef, useState } from "react";
import { apiClient } from "@/utils/apiClient";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import toast from "react-hot-toast";
import { PiTornadoThin } from "react-icons/pi";
import { LuCalendar, LuClock3, LuCalendarClock, LuTv2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { truncateText } from "@/utils/truncateText";
import { getInitials } from "@/utils/getInitials";

const Cards = () => {
  const fetchRef = useRef(false);
  const router = useRouter();

  const [cardsData, setCardsData] = useState<{ [key: string]: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const iconClassName = "h-[50px] w-[50px] text-[#074F57]";

  type CardTitle =
    | "Leaves Available"
    | "Today’s Hours"
    | "Next Meeting"
    | "Shift Timings";

  const iconMap: Record<CardTitle, JSX.Element> = {
    "Leaves Available": <LuCalendar className={iconClassName} />,
    "Today’s Hours": <LuClock3 className={iconClassName} />,
    "Next Meeting": <LuTv2 className={iconClassName} />,
    "Shift Timings": <LuCalendarClock className={iconClassName} />,
  };

  const fetchCardsData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/dashboard/cards");
      setCardsData(response.data.data);
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/auth/login");
          toast.error("You need to login first");
        } else {
          setError(
            `Error: ${err.response.status} - ${
              err.response.data.message || "Failed to fetch cards"
            }`
          );
        }
      } else if (err.request) {
        setError("Network error: Failed to receive a response");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetchRef.current) {
      fetchCardsData();
      fetchRef.current = true;
    }
  }, []);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) {
    toast.error(error);
  }

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-[20px] lg:grid-flow-row-dense w-full max-w-full">
      {cardsData &&
        Object.values(cardsData).map((card: any, index: number) => (
          <Card
            key={index}
            className="xl:w-[240px] h-[100px] lg:w-[380px] md:w-[450px] overflow-hidden p-4 border-none bg-[#cfe2e2] shadow-lg rounded-md text-left mx-auto"
          >
            <CardContent className="p-0 h-full flex flex-row items-center justify-around">
              <CardDescription className="p-0 pr-2 flex">
                <span>
                  {/* Render icon based on card.title */}
                  {iconMap[card.title as CardTitle] || (
                    <PiTornadoThin className="h-[50px] w-[50px]" />
                  )}{" "}
                  {/* Default icon */}
                </span>
              </CardDescription>
              <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-[#074F57]">
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
                <span className="text-[10px]">{card.title}</span>
              </CardDescription>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Cards;
