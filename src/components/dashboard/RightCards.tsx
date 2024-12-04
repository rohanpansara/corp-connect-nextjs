import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import AttendanceToggleButtons from "./AttendanceToggle";

const RightSideCards = () => {
  return (
    <>
      <Card className="w-1/2 h-[216px] mr-2 p-2 bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md">
        <CardHeader className="flex flex-row justify-between items-center p-1">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-800">Work Hours</span>
          <div className="flex items-center w-[100px] border-[1px] overflow-hidden border-gray-600 dark:border-gray-300 rounded-[4px]">
            <AttendanceToggleButtons />
          </div>
        </CardHeader>
        <CardContent className="h-[70%] pb-0 w-full flex items-center justify-center">
          <CardDescription className="h-full flex justify-center items-center">
            <div className="w-full flex justify-center items-center">
              <span className="font-bold text-7xl text-gray-600 dark:text-gray-800">7.5</span>
            </div>
          </CardDescription>
        </CardContent>
        <CardFooter className="p-1 w-full flex justify-center items-center">
          <span className="text-sm text-gray-600 dark:text-gray-800">On time today</span>
        </CardFooter>
      </Card>
      <Card className="w-1/2 h-[216px] ml-2 p-2 bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md">
        <CardHeader></CardHeader>
      </Card>
    </>
  );
};

export default RightSideCards;
