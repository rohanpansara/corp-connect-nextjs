import { dashboardMetadata } from "@/app/metadata/dashboardMetadata";
import RightSideCards from "@/components/dashboard/RightCards";
import SideCardsWrapper from "@/components/dashboard/wrappers/SideCardWrapper";
import WelcomeHeaderWrapper from "@/components/dashboard/wrappers/WelcomeHeaderWrapper";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <WelcomeHeaderWrapper />
      <div className="w-full max-w-full flex h-[200px]">
        <div className="grid md:grid-cols-1 xl:grid-cols-2 mr-auto w-[50%] max-w-[50%] gap-y-[16px]">
          <SideCardsWrapper />
          <SideCardsWrapper />
        </div>
        <div className="flex-grow flex h-full bg-mainBackground">
          <RightSideCards />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
