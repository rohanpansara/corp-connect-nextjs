import { BiNotification, BiSun, BiUser } from "react-icons/bi";

export function AppNavbar() {
  return (
    <div className="fixed w-[calc(100%-12rem)] max-w-full h-[30px] p-2 pt-0 bg-gray-600 space-y-4 z-50">
      <div className="flex justify-between items-center">
        <div className="text-sm font-sans font-semibold">Navbar</div>
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
