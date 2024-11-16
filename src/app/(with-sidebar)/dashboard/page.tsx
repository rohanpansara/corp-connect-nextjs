import { Inter } from "next/font/google";
import Cards from "@/components/dashboard/DashboardCards";
import { dashboardMetadata } from '@/app/metadata/dashboardMetadata';
export const metadata = dashboardMetadata;

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });


const DashboardPage = () => {
  return (
    <div className={`min-h-screen w-full bg-[#F8F6F4] flex items-center flex-col space-y-4 p-4 ${inter.className}`}>
      <Cards />
    </div>
  );
};

export default DashboardPage;
