"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react"; // For handling loading state during API call
import clsx from "clsx"; // Import clsx for conditional classnames
import {
  PiSquaresFourLight,
  PiCalendarXLight,
  PiCalendarDotsLight,
  PiUsersLight,
  PiBankLight,
  PiUserSquareLight,
  PiGearLight,
  PiSignOutLight
} from "react-icons/pi";
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
import { apiClient } from "@/app/api/apiClient";

// Menu items.
const upperMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: PiSquaresFourLight },
  { title: "Leaves", url: "/leaves", icon: PiCalendarXLight },
  { title: "Attendance", url: "/attendance", icon: PiCalendarDotsLight },
  { title: "Users", url: "/users", icon: PiUsersLight },
  { title: "Finance", url: "/finance", icon: PiBankLight },
];

const lowerMenuItems = [
  { title: "Profile", url: "/profile", icon: PiUserSquareLight },
  { title: "Settings", url: "/settings", icon: PiGearLight },
  { title: "Logout", url: "/auth/login", icon: PiSignOutLight },
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
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebarBackground">
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
                        "text-gray-900 dark:text-gray-400 font-medium text-xs":
                          currentSegment === getLastPathSegment(item.url),
                        "text-gray-500 dark:text-gray-600 text-xs":
                          currentSegment !== getLastPathSegment(item.url),
                      })}
                    >
                      <div
                        className={clsx("text-xl", {
                          "bg-primary h-full w-[2px] rounded-full":
                            currentSegment === getLastPathSegment(item.url),
                        })}
                      ></div>
                      <item.icon
                        className={clsx("text-xl", {
                          "text-gray-900 dark:text-gray-400 fill-current":
                            currentSegment === getLastPathSegment(item.url),
                          "text-gray-500 dark:text-gray-600":
                            currentSegment !== getLastPathSegment(item.url),
                        })}
                      />
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
                          "text-gray-900 dark:text-gray-400 font-medium text-xs":
                            currentSegment === getLastPathSegment(item.url),
                          "text-gray-500 dark:text-gray-600 text-xs":
                            currentSegment !== getLastPathSegment(item.url),
                        })}
                        disabled={loading} // Disable the button while loading
                      >
                        <div
                          className={clsx("text-xl", {
                            "bg-bg-primary h-full w-[2px] rounded-full":
                              currentSegment === getLastPathSegment(item.url),
                          })}
                        ></div>
                        <item.icon
                          className={clsx("text-xl", {
                            "text-gray-900 dark:text-gray-400 fill-current":
                              currentSegment === getLastPathSegment(item.url),
                            "text-gray-500 dark:text-gray-600":
                              currentSegment !== getLastPathSegment(item.url),
                          })}
                        />
                        <span>{loading ? "Logging out..." : item.title}</span>
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className={clsx({
                          "text-gray-900 dark:text-gray-400 font-medium text-xs":
                            currentSegment === getLastPathSegment(item.url),
                          "text-gray-500 dark:text-gray-600 text-xs":
                            currentSegment !== getLastPathSegment(item.url),
                        })}
                      >
                        <div
                          className={clsx("text-xl", {
                            "bg-primary h-full w-[2px] rounded-full":
                              currentSegment === getLastPathSegment(item.url),
                          })}
                        ></div>
                        <item.icon
                          className={clsx("text-xl", {
                            "text-gray-900 dark:text-gray-400 fill-current":
                              currentSegment === getLastPathSegment(item.url),
                            "text-gray-500 dark:text-gray-600":
                              currentSegment !== getLastPathSegment(item.url),
                          })}
                        />
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
