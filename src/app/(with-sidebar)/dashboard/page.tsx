import { dashboardMetadata } from "@/app/metadata/dashboardMetadata";
import DashboardCardsWrapper from "@/components/dashboard/wrappers/DashboardCardWrapper";
import WelcomeHeaderWrapper from "@/components/dashboard/wrappers/WelcomeHeaderWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <WelcomeHeaderWrapper />
      <div className="w-full max-w-full flex">
        <div className="grid md:grid-cols-1 xl:grid-cols-2 mr-auto w-[50%] max-w-[50%]">
          <DashboardCardsWrapper />
        </div>
        <div className="flex-grow flex h-[200px] bg-mainBackground">
          <Card className="w-1/2 h-full mr-2 p-2 bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md">
            <CardHeader className="flex flex-row justify-between items-center p-2">
              <span className="text-sm font-medium text-gray-600">
                Attendance
              </span>
              <div>
                <Button variant="plain" size="nothing" className="text-sm font-medium">
                  Today
                </Button>
              </div>
            </CardHeader>
          </Card>
          <Card className="w-1/2 h-full ml-2 p-2 bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md">
            <CardHeader></CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
