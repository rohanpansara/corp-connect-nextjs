"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Poppins } from "next/font/google";

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

const WelcomeHeader = ({ userName }: { userName: string | null }) => {
  return (
    <div className={`flex justify-start items-center w-full max-w-full h-[40px] ${poppins.className}`}>
      {userName ? (
        <>
          <span>{getGreeting()},&nbsp;</span>
          <span className="text-lg font-semibold">{userName}!</span>
        </>
      ) : (
        <Skeleton className="w-full h-full py-[2px] rounded-md" />
      )}
    </div>
  );
};

export default WelcomeHeader;
