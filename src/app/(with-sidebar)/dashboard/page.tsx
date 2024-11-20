import Cards from "@/components/dashboard/DashboardCards";
import { dashboardMetadata } from '@/app/metadata/dashboardMetadata';
export const metadata = dashboardMetadata;


const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <Cards />
    </div>
  );
};

export default DashboardPage;
