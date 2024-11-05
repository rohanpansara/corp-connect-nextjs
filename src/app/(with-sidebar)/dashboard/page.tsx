import Cards from "@/components/dashboard/dashboard-cards";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

import { dashboardMetadata } from '@/app/metadata/dashboardMetadata';
import UserTable from "@/components/dashboard/dashboard-table";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  return (
    <div
      className={`min-h-screen w-full bg-[#F8F6F4] flex items-center flex-col space-y-4 p-4 ${inter.className}`}
    >
      <Cards />
      <UserTable />
    </div>
  );
};

export default DashboardPage;
