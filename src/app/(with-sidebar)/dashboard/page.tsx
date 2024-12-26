import { dashboardMetadata } from "@/app/metadata/dashboardMetadata";
import LeftSideCardsWrapper from "@/components/dashboard/wrappers/LeftSideCardsWrapper";
import RightSideCardsWrapper from "@/components/dashboard/wrappers/RightSideCardsWrapper";
import WelcomeHeaderWrapper from "@/components/dashboard/wrappers/WelcomeHeaderWrapper";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  return (
    <div className="h-[calc(100vh-30px)] w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <WelcomeHeaderWrapper />
      <div className="w-full p-1 gap-1 flex h-[240px] rounded-md">
        <LeftSideCardsWrapper />
        <RightSideCardsWrapper />
      </div>
    </div>
  );
};

export default DashboardPage;
