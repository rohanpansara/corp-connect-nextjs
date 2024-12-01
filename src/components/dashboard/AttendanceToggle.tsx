"use client"

import { useState } from "react";
import { Button } from "../ui/button";

const AttendanceToggleButtons = () => {
  const [active, setActive] = useState<"daily" | "weekly">("daily");

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
