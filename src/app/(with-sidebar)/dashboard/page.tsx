import { dashboardMetadata } from "@/app/metadata/dashboardMetadata";
import LeftSideCardsWrapper from "@/components/dashboard/wrappers/LeftSideCardsWrapper";
import WelcomeHeaderWrapper from "@/components/dashboard/wrappers/WelcomeHeaderWrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <WelcomeHeaderWrapper />
      <div className="w-full p-1 gap-1 flex h-[240px] rounded-md">
        <LeftSideCardsWrapper />
        <div className="w-1/2 h-full flex gap-1 rounded-md overflow-hidden">
          <div className="w-1/2 h-full rounded-md">
            <Card className="h-full flex flex-col p-2 border-none bg-cardBackgroundColor rounded-md">
              <CardHeader className="p-2">
                <div className="flex justify-between items-center w-full">
                  <div className="w-1/2 text-xs text-gray-600">
                    Average Hours
                  </div>
                  <div className="w-1/2 h-[26px] bg-gray-100 text-center rounded-sm flex justify-between items-center overflow-hidden p-1 gap-1">
                    <div className="h-[10px] w-1/2 text-[9px] text-gray-500 rounded-sm flex justify-center items-center">
                      Today
                    </div>
                    <div className="h-[20px] w-1/2 text-[10px] shadow-lg bg-cardTextColor text-gray-100 rounded-sm flex justify-center items-center">
                      Weekly
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-0 px-2">
                {/* Add content here */}
              </CardContent>
              <CardFooter className="p-2">
                <div className="flex justify-center items-center w-full text-xs">
                  2 late ins this week
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="w-1/2 h-full rounded-md">
            <Card className="h-full flex flex-col p-2 border-none bg-cardBackgroundColor rounded-md">
              <CardHeader className="p-2">
              <div className="flex justify-between items-center w-full">
                  <div className="w-1/2 text-xs text-gray-600">
                    Average Hours
                  </div>
                  <div className="w-1/2 h-[26px] bg-gray-100 text-center rounded-sm flex justify-between items-center overflow-hidden p-1 gap-1">
                    <div className="h-[10px] w-1/2 text-[9px] text-gray-500 rounded-sm flex justify-center items-center">
                      Today
                    </div>
                    <div className="h-[20px] w-1/2 text-[10px] shadow-lg bg-cardTextColor text-gray-100 rounded-sm flex justify-center items-center">
                      Weekly
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Add content here */}
              </CardContent>
              <CardFooter className="p-2">
                <div className="flex justify-center items-center w-full text-xs">
                  2 late ins this week
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
