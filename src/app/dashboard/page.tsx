import Cards from "@/components/dashboard-cards";
import { Inter } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: "Dashboard | CorpConnect",
    description: "Your daily office buddy",
    keywords: ["dashboard", "office", "corpconnect", "employee management"],
    author: "CorpConnect Team",
};


const DashboardPage = () => {
    return (
        <div className={`min-h-screen bg-[#F8F6F4] flex items-center justify-center flex-col space-y-6 p-6 ${inter.className}`}>
            <h1 className="text-black text-3xl font-semibold mb-8">Dashboard</h1>
            <Cards />
        </div>
    );
};

export default DashboardPage;
