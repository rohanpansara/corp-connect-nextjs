"use client";
import SettingsPageHeader from "@/components/common/SettingsPageHeader";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh-30px)] w-full bg-mainBackground flex flex-col items-center space-y-4 p-4">
      {/* Common Header for all Settings Pages */}
      <div className="h-[30px] w-full max-w-full">
        <SettingsPageHeader />
      </div>

      {/* Page-Specific Content */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default SettingsLayout;