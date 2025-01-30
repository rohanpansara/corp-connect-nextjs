"use client";
import { FC, ReactNode } from "react";

interface WidgetProps {
  title: string;
  icon: ReactNode;
  bgColor: string;
}

const WidgetCard: FC<WidgetProps> = ({ title, icon, bgColor }) => {
  return (
    <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
      <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
        <div className={`rounded-full p-3 ${bgColor}`}>
          {icon} {/* ✅ Fix: Render the JSX directly */}
        </div>
        <div className="pl-8 text-xl text-slate-500">{title}</div>
      </div>
    </div>
  );
};

export default WidgetCard;
