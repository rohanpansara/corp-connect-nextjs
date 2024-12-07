import { dashboardMetadata } from "@/app/metadata/dashboardMetadata";
import WelcomeHeaderWrapper from "@/components/dashboard/wrappers/WelcomeHeaderWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { IoCalendarOutline } from "react-icons/io5";
export const metadata = dashboardMetadata;

const DashboardPage = () => {
  const iconClassName = "h-[50px] w-[50px] text-cardTextColor";

  return (
    <div className="min-h-screen w-full bg-mainBackground flex items-center flex-col space-y-4 p-4">
      <WelcomeHeaderWrapper />
      <div className="w-full p-1 gap-1 flex h-[240px] rounded-md">
        <div className="w-1/2 h-full flex flex-col gap-1 rounded-md overflow-hidden">
          <div className="w-full h-1/2 gap-1 flex overflow-hidden">
            <div className="w-1/2 h-full rounded-sm rounded-tl-md">
              <Card className="h-full w-full overflow-hidden p-4 border-none bg-cardBackgroundColor rounded-md text-left">
                <CardContent className="p-0 h-full flex flex-row items-center justify-around">
                  <CardDescription className="p-0 pr-2 flex">
                    <span>
                      <IoCalendarOutline className={iconClassName} />
                    </span>
                  </CardDescription>
                  <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-cardTextColor">
                    <span className="text-[16px] font-extrabold cursor-default">
                      7h 30m
                    </span>
                    <span className="text-[10px]">Shift Timings</span>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
            <div className="w-1/2 h-full rounded-sm rounded-tr-md">
              <Card className="h-full w-full overflow-hidden p-4 border-none bg-cardBackgroundColor rounded-md text-left">
                <CardContent className="p-0 h-full flex flex-row items-center justify-around">
                  <CardDescription className="p-0 pr-2 flex">
                    <span>
                      <IoCalendarOutline className={iconClassName} />
                    </span>
                  </CardDescription>
                  <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-cardTextColor">
                    <span className="text-[16px] font-extrabold cursor-default">
                      7h 30m
                    </span>
                    <span className="text-[10px]">Shift Timings</span>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-full h-1/2 gap-1 flex overflow-hidden">
            <div className="w-full h-full rounded-md">
              <Card className="h-full w-full overflow-hidden p-4 border-none bg-cardBackgroundColor rounded-md text-left">
                <CardContent className="p-0 h-full flex flex-row items-center justify-around">
                  <CardDescription className="p-0 pr-2 flex">
                    <span>
                      <IoCalendarOutline className={iconClassName} />
                    </span>
                  </CardDescription>
                  <CardDescription className="p-0 pl-2 flex flex-col justify-center items-left text-cardTextColor">
                    <span className="text-[16px] font-extrabold cursor-default">
                      7h 30m
                    </span>
                    <span className="text-[10px]">Shift Timings</span>
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex gap-1 rounded-md overflow-hidden">
          <div className="w-1/2 h-full rounded-md">
            <Card className="h-full flex flex-col p-4 border-none bg-cardBackgroundColor rounded-md">
              <CardHeader className="p-2">
                <div className="flex justify-between items-center w-full text-xs">
                  <div>Average Hours</div>
                  <div>Today | Weekly</div>
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
            <Card className="h-full flex flex-col p-4 border-none bg-cardBackgroundColor rounded-md">
              <CardHeader className="p-2">
                <div className="flex justify-between items-center w-full text-xs">
                  <div>Average Hours</div>
                  <div>Today | Weekly</div>
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
