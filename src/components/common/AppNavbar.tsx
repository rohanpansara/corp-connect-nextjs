import ThemeToggle from "@/hooks/uiHooks/ThemeToggle";
import { BiNotification, BiUser } from "react-icons/bi";

export function AppNavbar() {
  return (
    <div className="sticky top-0 flex justify-center items-center w-full max-w-auto h-[30px] p-2 pt-0 pb-0 bg-mainBackground space-y-4 z-[500]">
      <div className="flex items-center w-full">
        <div className="flex justify-center items-center ml-auto">
          <div className="mr-2 text-lg">
            <BiNotification />
          </div>
          <div className="ml-2 mr-2 text-lg">
            <BiUser />
          </div>
          <div className="ml-2 text-lg">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
