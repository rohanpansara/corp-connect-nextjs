import { dashboardMetadata } from "@/app/metadata/dashboardMetadata";
import DashboardCardsWrapper from "@/components/dashboard/wrappers/DashboardCardWrapper";
import WelcomeHeaderWrapper from "@/components/dashboard/wrappers/WelcomeHeaderWrapper";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <WelcomeHeaderWrapper />
      <div className="w-full max-w-full flex">
        <DashboardCardsWrapper />
        
      </div>
    </div>
  );
};

export default DashboardPage;
