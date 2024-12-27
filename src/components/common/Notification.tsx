import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { MdMarkEmailRead } from "react-icons/md";
import { PiBellSimpleLight } from "react-icons/pi";
import { MenubarShortcut } from "../ui/menubar";

export function Notification() {
  return (
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
              <MdMarkEmailRead />
            </MenubarShortcut>
            <span className="flex-grow text-left">Mark all as read</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
