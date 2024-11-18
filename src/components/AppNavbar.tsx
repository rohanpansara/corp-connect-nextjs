import ThemeToggle from "@/hooks/uiHooks/ThemeToggle";
import { BiNotification, BiSun, BiUser } from "react-icons/bi";

export function AppNavbar() {
  return (
    <div className="sticky top-0 flex justify-center items-center w-full max-w-auto h-[30px] p-2 pt-0 pb-0 bg-gray-800 dark:bg-gray-500 space-y-4 z-[1000]">
      <div className="flex justify-between items-center w-full">
        <div className="text-sm font-sans font-semibold mr-auto">Navbar</div>
        <div className="flex justify-center items-center">
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
