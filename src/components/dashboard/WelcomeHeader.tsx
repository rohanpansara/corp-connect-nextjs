"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Poppins } from "next/font/google";
import { PiCalendarBlankLight } from "react-icons/pi";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const getGreeting = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const formatDate = (): { day: string; date: string } => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const day = today.toLocaleDateString(undefined, { weekday: "long" });
  const date = today.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return { day, date };
};

const WelcomeHeader = ({ userName }: { userName: string | null }) => {
  const { day, date } = formatDate();

  return (
    <div
      className={`flex justify-between items-end px-1 text-gray-600 dark:text-gray-400 w-full max-w-full h-[30px] ${poppins.className}`}
    >
      <div>
        {userName ? (
          <>
            <span>{getGreeting()},&nbsp;</span>
            <span className="font-semibold">{userName}!</span>
          </>
        ) : (
          <Skeleton className="w-full h-full rounded-md" />
        )}
      </div>
      <div className="flex items-end justify-end text-[11px] h-full">
        <div className="flex flex-col items-end text-left">
          <div className="font-semibold">{day}</div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
