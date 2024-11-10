"use client"
import {
  FaUser,
  FaCalendarAlt,
  FaCalendarTimes,
  FaTools,
  FaMoneyCheckAlt,
  FaUserAlt,
  FaUserFriends,
} from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { BiSolidLogOut } from "react-icons/bi";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // Import clsx for conditional classnames
import { getLastPathSegment } from "@/utils/getLastURLSegment";
import { title } from "process";
import { url } from "inspector";

// Menu items.
const upperMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: RiDashboardHorizontalFill,
  },
  {
    title: "Leaves",
    url: "/leaves",
    icon: FaCalendarTimes,
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: FaCalendarAlt,
  },
  {
    title: "Users",
    url: "/user",
    icon: FaUserFriends
  },
  {
    title: "Finance",
    url: "/finance",
    icon: FaMoneyCheckAlt,
  },
];

const lowerMenuItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: FaUser,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: FaTools,
  },
  {
    title: "Logout",
    url: "/auth/login",
    icon: BiSolidLogOut,
  }
];

export function AppSidebar() {
  const pathname = usePathname();
  const currentSegment = getLastPathSegment(pathname);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CorpConnect</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {upperMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={clsx({
                        "text-blue-500 font-semibold": currentSegment === getLastPathSegment(item.url),
                        "text-gray-700": currentSegment !== getLastPathSegment(item.url),
                      })}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {lowerMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={clsx({
                        "text-blue-500 font-semibold": currentSegment === getLastPathSegment(item.url),
                        "text-gray-700": currentSegment !== getLastPathSegment(item.url),
                      })}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
