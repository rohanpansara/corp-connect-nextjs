"use client";

import { useEffect, useRef, useState } from "react";
import { apiClient } from "@/utils/apiClient";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import toast from "react-hot-toast";
import { PiTornadoThin } from "react-icons/pi";
import { FcClock, FcConferenceCall, FcLeave, FcOvertime } from "react-icons/fc";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { truncateText } from "@/utils/truncateText";

const Cards = () => {
  const fetchRef = useRef(false);
  const router = useRouter();

  const [cardsData, setCardsData] = useState<{ [key: string]: any } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const iconClassName = "h-[50px] w-[50px]";

  type CardTitle = "Leaves Available" | "Today’s Hours" | "Next Meeting" | "Shift Timings";

  const iconMap: Record<CardTitle, JSX.Element> = {
    "Leaves Available": <FcLeave className={iconClassName} />,
    "Today’s Hours": <FcClock className={iconClassName} />,
    "Next Meeting": <FcConferenceCall className={iconClassName} />,
    "Shift Timings": <FcOvertime className={iconClassName} />
  };

  const fetchCardsData = async () => {
    try {
      const response = await apiClient.get("/dashboard/cards");
      setCardsData(response.data.data);
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          router.push("/auth/login");
          toast.error("You need to login first");
        } else {
          setError(
            `Error: ${err.response.status} - ${err.response.data.message || "Failed to fetch cards"
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] lg:grid-flow-row-dense w-full max-w-full">
      {cardsData &&
        Object.values(cardsData).map((card: any, index: number) => (
          <Card
            key={index}
            className="w-[220px] h-[100px] overflow-hidden p-4 border-none bg-[#cfe2e2] shadow-lg rounded-md text-left mx-auto"
          >
            <CardContent className="p-0 h-full flex flex-row justify-around items-center my-auto">
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
                      <span className="text-[16px] font-bold cursor-default">
                        {truncateText(card.value, 12)}
                      </span>
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
