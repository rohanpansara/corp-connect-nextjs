"use client";
import { RemixiconComponentType } from "@remixicon/react";
import { FC, useState } from "react";
import { IconType } from "react-icons/lib";

interface WidgetProps {
  title: string;
  Icon: IconType | RemixiconComponentType;
  iconFill: string;
  bgColor: string;
}

const WidgetCard: FC<WidgetProps> = ({ title, Icon, iconFill, bgColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-full rounded-md shadow-sm hover:shadow-md hover:scale-105 transition-transform"
      style={{ background: isHovered ? bgColor : "#eef0f1" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
        <div className={`rounded-full p-3`} style={{ background: bgColor }}>
          <Icon style={{ height: 24, width: 24, fill: iconFill }} />
        </div>
        <div className="pl-8 text-2xl md:text-xl lg:text-lg xl:text-md text-slate-500">
          {title}
        </div>
      </div>
    </div>
  );
};

export default WidgetCard;
