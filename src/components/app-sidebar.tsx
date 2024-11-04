import {
  FaUser,
  FaCalendarAlt,
  FaCalendarTimes,
  FaTools,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { RiDashboardHorizontalFill, RiProfileFill } from "react-icons/ri";
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
    url: "#",
    icon: FaCalendarAlt,
  },
  {
    title: "Finance",
    url: "#",
    icon: FaMoneyCheckAlt,
  },
];

const lowerMenuItems = [
  {
    title: "Profile",
    url: "#",
    icon: FaUser,
  },
  {
    title: "Settings",
    url: "#",
    icon: FaTools,
  },
];

export function AppSidebar() {
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
                      <a href={item.url}>
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
                      <a href={item.url}>
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

