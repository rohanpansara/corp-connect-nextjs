"use client";
import { RemixiconComponentType } from "@remixicon/react";
import { ElementType, FC, ReactNode } from "react";
import { IconType } from "react-icons/lib";

interface WidgetProps {
  title: string;
  Icon: IconType | RemixiconComponentType;
  iconFill: string;
  bgColor: string;
}

const WidgetCard: FC<WidgetProps> = ({ title, Icon, iconFill, bgColor }) => {
  return (
    <div className="w-full h-full bg-[#eef0f1] rounded-md shadow-sm">
      <div className="w-full h-full flex justify-start items-center p-1 px-4 rounded-[3px]">
        <div className={`rounded-full p-3`} style={{background : bgColor}}>
          <Icon style={{height: 24, width: 24, fill: iconFill}}/>
        </div>
        <div className="pl-8 text-xl text-slate-500">{title}</div>
      </div>
    </div>
  );
};

export default WidgetCard;
