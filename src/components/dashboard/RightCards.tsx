import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import AttendanceToggleButtons from "./AttendanceToggle";
import { DonutChart } from "../chart/DonutChart";

const RightSideCards = () => {
  return (
    <>
      <Card className="w-1/2 h-[216px] mr-2 p-2 bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md">
        <CardHeader className="flex flex-row justify-between items-center p-1">
          <span className="text-sm font-medium text-gray-600">Work Hours</span>
          <div className="flex items-center w-[100px] border-[1px] overflow-hidden border-gray-600 dark:border-gray-300 rounded-[4px]">
            <AttendanceToggleButtons />
          </div>
        </CardHeader>
        <CardContent className="h-full w-full flex items-center justify-center">
          <CardDescription>
            {/* <DonutChart >

            </DonutChart> */}
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="w-1/2 h-[216px] ml-2 p-2 bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md">
        <CardHeader></CardHeader>
      </Card>
    </>
  );
};

export default RightSideCards;
