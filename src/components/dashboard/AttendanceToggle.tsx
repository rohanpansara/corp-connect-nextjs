"use client";

import { Button } from "../ui/button";

interface AttendanceToggleButtonsProps {
  active: "daily" | "weekly";
  setActive: (value: "daily" | "weekly") => void;
}

const AttendanceToggleButtons = ({
  active,
  setActive,
}: AttendanceToggleButtonsProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Button
        variant={active === "daily" ? "toggle_btn" : "plain"}
        size="nothing"
        className={`text-[10px] w-1/2 font-medium m-0 p-1 ${
          active === "daily" ? "bg-blue-500 text-white px-1" : ""
        }`}
        onClick={() => setActive("daily")}
      >
        Daily
      </Button>
      <Button
        variant={active === "weekly" ? "toggle_btn" : "plain"}
        size="nothing"
        className={`text-[10px] w-1/2 font-medium m-0 p-1 ${
          active === "weekly" ? "bg-blue-500 text-white px-1" : ""
        }`}
        onClick={() => setActive("weekly")}
      >
        Weekly
      </Button>
    </div>
  );
};

export default AttendanceToggleButtons;
