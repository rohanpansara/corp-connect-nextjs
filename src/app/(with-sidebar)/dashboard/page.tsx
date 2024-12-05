import { dashboardMetadata } from "@/app/metadata/dashboardMetadata";
import LeftSideCardsWrapper from "@/components/dashboard/wrappers/LeftSideCardsWrapper";
import RightSideCardsWrapper from "@/components/dashboard/wrappers/RightSideCardsWrapper";
import WelcomeHeaderWrapper from "@/components/dashboard/wrappers/WelcomeHeaderWrapper";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <WelcomeHeaderWrapper />
      <div className="w-full max-w-full flex h-[200px]">
        <div className="grid md:grid-cols-2 xl:grid-cols-2 mr-auto w-[50%] max-w-[50%] gap-y-[16px]">
          <LeftSideCardsWrapper />
          <LeftSideCardsWrapper />
        </div>
        <div className="flex-grow flex h-full bg-mainBackground">
          <RightSideCardsWrapper />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
