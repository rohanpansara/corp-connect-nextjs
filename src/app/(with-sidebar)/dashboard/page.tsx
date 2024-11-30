import { dashboardMetadata } from "@/app/metadata/dashboardMetadata";
import RightSideCards from "@/components/dashboard/RightCards";
import SideCardsWrapper from "@/components/dashboard/wrappers/SideCardWrapper";
import WelcomeHeaderWrapper from "@/components/dashboard/wrappers/WelcomeHeaderWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <WelcomeHeaderWrapper />
      <div className="w-full max-w-full flex">
        <div className="grid md:grid-cols-1 xl:grid-cols-2 mr-auto w-[50%] max-w-[50%]">
          <SideCardsWrapper />
        </div>
        <div className="flex-grow flex h-[200px] bg-mainBackground">
          <RightSideCards />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
