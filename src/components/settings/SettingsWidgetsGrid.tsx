"use client";
import { widgets } from "@/static/widgets";
import WidgetCard from "./WidgetCard";

const SettingsWidgetsGrid = () => {
  return (
    <div
      className="grid w-full h-full gap-2
      grid-cols-1 grid-rows-12
      sm:grid-cols-2 sm:grid-rows-6
      md:grid-cols-3 md:grid-rows-4
      lg:grid-cols-3 lg:grid-rows-4
      xl:grid-cols-4 xl:grid-rows-4
      2xl:grid-cols-4 2xl:grid-rows-3"
    >
      {widgets.map((widget) => (
        <WidgetCard 
        title={widget.title}
        Icon={widget.icon}
        iconFill={widget.iconFill}
        bgColor={widget.bgColor}
      />
      ))}
    </div>
  );
};

export default SettingsWidgetsGrid;
