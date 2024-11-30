import {
    Card,
    CardHeader
} from "@/components/ui/card";
import { Button } from "../ui/button";

const RightSideCards = () => {

  return (
    <>
      <Card className="w-1/2 h-full mr-2 p-2 bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md">
        <CardHeader className="flex flex-row justify-between items-center p-2">
          <span className="text-sm font-medium text-gray-600">Attendance</span>
          <div className="flex justify-center items-center">
            <Button
              variant="plain"
              size="nothing"
              className="text-sm font-medium m-0"
            >
              Today
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Card className="w-1/2 h-full ml-2 p-2 bg-[#cfe2e2] dark:bg-[#2CA58D] shadow-lg rounded-md">
        <CardHeader></CardHeader>
      </Card>
    </>
  );
};

export default RightSideCards;
