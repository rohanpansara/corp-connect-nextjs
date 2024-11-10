"use client"
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react"; // For handling loading state during API call
import clsx from "clsx"; // Import clsx for conditional classnames
import { FaUser, FaCalendarAlt, FaCalendarTimes, FaTools, FaMoneyCheckAlt, FaUserFriends } from "react-icons/fa";
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
import { getLastPathSegment } from "@/utils/getLastURLSegment";
import {apiClient} from "@/app/api/apiClient"; 

// Menu items.
const upperMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: RiDashboardHorizontalFill },
  { title: "Leaves", url: "/leaves", icon: FaCalendarTimes },
  { title: "Attendance", url: "/attendance", icon: FaCalendarAlt },
  { title: "Users", url: "/users", icon: FaUserFriends },
  { title: "Finance", url: "/finance", icon: FaMoneyCheckAlt },
];

const lowerMenuItems = [
  { title: "Profile", url: "/profile", icon: FaUser },
  { title: "Settings", url: "/settings", icon: FaTools },
  { title: "Logout", url: "/auth/login", icon: BiSolidLogOut },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const currentSegment = getLastPathSegment(pathname);
  const [loading, setLoading] = useState(false); // Handle loading state for the API request

  // Handle logout
  const handleLogout = async () => {
    setLoading(true); // Set loading state to true while API is being called
    try {
      const response = await apiClient.post("/auth/logout"); // Assuming the logout endpoint is "/auth/logout"
      if (response.status === 200) {
        // Redirect to login page on successful logout
        router.push("/auth/login");
      } else {
        // Handle unsuccessful logout (show error message or log)
        console.error("Logout failed", response);
      }
    } catch (error) {
      // Handle error (network failure, etc.)
      console.error("Error during logout", error);
    } finally {
      setLoading(false); // Reset loading state after the API call
    }
  };

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
                    {item.title === "Logout" ? (
                      <button
                        onClick={handleLogout}
                        className={clsx({
                          "text-blue-500 font-semibold": currentSegment === getLastPathSegment(item.url),
                          "text-gray-700": currentSegment !== getLastPathSegment(item.url),
                        })}
                        disabled={loading} // Disable the button while loading
                      >
                        <item.icon />
                        <span>{loading ? "Logging out..." : item.title}</span>
                      </button>
                    ) : (
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
                    )}
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
