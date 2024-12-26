import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import ThemeToggle from "@/hooks/uiHooks/ThemeToggle";
import { IoPeople } from "react-icons/io5";
import { PiBellSimpleLight, PiUserCircleLight } from "react-icons/pi";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";

export function AppNavbar() {
  return (
    <div className="sticky top-0 flex justify-center items-center w-full max-w-auto h-[30px] p-2 pt-0 pb-0 bg-mainBackground space-y-4 z-[500]">
      <div className="flex items-center w-full">
        <div className="flex justify-center items-center ml-auto">
          <div className="mr-2 text-lg">
            <Menubar className="p-0 bg-transparent outline-none shadow-none space-0 border-none">
              <MenubarMenu>
                <MenubarTrigger className="p-0">
                  <PiBellSimpleLight />
                </MenubarTrigger>
                <MenubarContent className="w-[11rem]">
                  <MenubarItem className="rounded-sm w-full flex items-center">
                    <MenubarShortcut className="text-[12px] w-5 notification-icon-green">
                      <FaCalendarCheck />
                    </MenubarShortcut>
                    <span className="flex-grow text-left">Leave Approved!</span>
                  </MenubarItem>
                  <MenubarItem className="rounded-sm w-full flex items-center">
                    <MenubarShortcut className="text-[12px] w-5 notification-icon-general">
                      <IoPeople />
                    </MenubarShortcut>
                    <span className="flex-grow text-left">Meeting Invite</span>
                  </MenubarItem>
                  <MenubarItem className="rounded-sm w-full flex items-center">
                    <MenubarShortcut className="text-[12px] w-5 notification-icon-red">
                      <FaCalendarTimes />
                    </MenubarShortcut>
                    <span className="flex-grow text-left">Leave Rejected!</span>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="rounded-sm w-full flex items-center">
                    <MenubarShortcut className="text-[12px] w-5">
                      <MdMarkEmailRead/>
                    </MenubarShortcut>
                    <span className="flex-grow text-left">Mark all as read</span>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
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
