import Cards from "@/components/dashboard-cards";
import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard | CorpConnect",
  description: "Your daily office buddy",
  keywords: ["dashboard", "office", "corpconnect", "employee management"],
  author: "Rohan Pansara",
};

const DashboardPage = () => {
  return (
    <div
      className={`min-h-screen w-full bg-[#F8F6F4] flex items-center flex-col space-y-4 p-4 ${inter.className}`}
    >
      {/* <div className="w-full flex justify-center items-center rounded-tr-md rounded-tl-md h-[50px] bg-[#074F57]">
        <span className="text-center font-semibold text-[#C4DFDF]">
          Dashboard
        </span>
      </div> */}
      <Cards />
    </div>
  );
};

export default DashboardPage;
