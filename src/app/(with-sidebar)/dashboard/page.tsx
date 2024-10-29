import Cards from "@/components/dashboard-cards";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard | CorpConnect",
  description: "Your daily office buddy",
  keywords: ["dashboard", "office", "corpconnect", "employee management"],
  author: "CorpConnect Team",
};

const DashboardPage = () => {
  return (
    <div
      className={`min-h-screen w-full bg-[#F8F6F4] flex items-center justify-center flex-col space-y-6 p-6 ${inter.className}`}
    >
      <div className="w-[90%] flex justify-center items-center rounded-tr-md rounded-tl-md h-[50px] bg-slate-800 mb-8">
        <span className="text-center font-semibold text-blue-200">
          Dashboard
        </span>
      </div>
      <Cards />
    </div>
  );
};

export default DashboardPage;
