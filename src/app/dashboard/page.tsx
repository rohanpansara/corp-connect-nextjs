import Cards from "@/components/dashboard-cards";

export const metadata = {
    title: "Dashboard | CorpConnect",
    description: "Your daily office buddy",
    keywords: ["dashboard", "office", "corpconnect", "employee management"],
    author: "CorpConnect Team",
};


const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-[#0940AE] flex items-center justify-center flex-col space-y-6 p-6 font-[family-name:var(--font-poppins)]">
            <h1 className="text-white text-3xl font-semibold mb-8">Dashboard</h1>
            <Cards />
        </div>
    );
};

export default DashboardPage;
