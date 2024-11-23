import { dashboardMetadata } from "@/app/metadata/dashboardMetadata";
import Cards from "@/components/dashboard/DashboardCards";
import WelcomeHeaderWrapper from "@/components/dashboard/WelcomeHeaderWrapper";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <WelcomeHeaderWrapper />
      <Cards />
    </div>
  );
};

export default DashboardPage;
