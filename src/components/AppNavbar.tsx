import { BiNotification, BiSun, BiUser } from "react-icons/bi";
import { SidebarTrigger } from "./ui/sidebar";

export function AppNavbar() {
  return (
    <div className="w-full min-w-full">
      <SidebarTrigger />
      <div className="flex justify-between items-center p-2 w-full max-w-full">
        <div className="text-sm font-sans font-semibold">Navbar</div>
        <div className="flex">
          <div className="text-sm font-semibold">
            <BiNotification />
          </div>
          <div className="text-sm font-semibold">
            <BiUser />
          </div>
          <div className="text-sm font-semibold">
            <BiSun />
          </div>
        </div>
      </div>
    </div>
  );
}
