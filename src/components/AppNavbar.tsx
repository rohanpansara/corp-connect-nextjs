import { BiNotification, BiSun, BiUser } from "react-icons/bi";

export function AppNavbar() {
  return (
    <div className="fixed items-center w-full max-w-auto h-[30px] p-2 pt-0 pb-0 bg-gray-200 space-y-4 z-30">
      <div className="flex justify-between items-center w-auto">
        <div className="text-sm font-sans font-semibold mr-auto">Navbar</div>
        <div className="flex bg-black text-white">
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
