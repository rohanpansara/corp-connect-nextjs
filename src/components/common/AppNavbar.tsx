import ThemeToggle from "@/hooks/uiHooks/ThemeToggle";
import { BiNotification } from "react-icons/bi";
import { PiBellSimpleLight, PiUserCircleLight } from "react-icons/pi";

export function AppNavbar() {
  return (
    <div className="sticky top-0 flex justify-center items-center w-full max-w-auto h-[30px] p-2 pt-0 pb-0 bg-mainBackground space-y-4 z-[500]">
      <div className="flex items-center w-full">
        <div className="flex justify-center items-center ml-auto">
          <div className="mr-2 text-lg">
            <PiBellSimpleLight />
          </div>
          <div className="ml-2 mr-2 text-lg">
            <PiUserCircleLight />
          </div>
          <div className="ml-2 text-lg">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
