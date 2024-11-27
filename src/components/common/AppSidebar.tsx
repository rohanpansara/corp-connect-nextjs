"use client";

import { apiClient } from "@/app/api/apiClient";
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
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  PiCalendarDotsLight,
  PiCalendarXLight,
  PiGearLight,
  PiSignOutLight,
  PiSquaresFourLight,
  PiUsersLight,
  PiUserSquareLight,
} from "react-icons/pi";
import { toast } from "sonner";

// Menu items.
const upperMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: PiSquaresFourLight },
  { title: "Leaves", url: "/leaves", icon: PiCalendarXLight },
  { title: "Attendance", url: "/attendance", icon: PiCalendarDotsLight },
  { title: "Users", url: "/users", icon: PiUsersLight },
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
  const [loading, setLoading] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post("/user/logout");
      if (response?.status === 200) {
        router.push("/auth/login");
        toast.success(response?.data?.message || "Logged Out")
      } else {
        console.error("Logout failed", response);
      }
    } catch (error) {
      console.error("Error during logout", error);
    } finally {
      setLoading(false);
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
                <SidebarMenuItem key={item.title} className="group">
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={clsx(
                        "anchor-common",
                        currentSegment === getLastPathSegment(item.url)
                          ? "anchor-active"
                          : "anchor-inactive"
                      )}
                    >
                      <div
                        className={clsx({
                          "text-xl bg-primary h-full w-[2px] rounded-full":
                            currentSegment === getLastPathSegment(item.url),
                        })}
                      ></div>
                      <item.icon
                        className={clsx(
                          "icon-common",
                          currentSegment === getLastPathSegment(item.url)
                            ? "icon-active"
                            : "icon-inactive"
                        )}
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
                        className={clsx(
                          "anchor-common",
                          currentSegment === getLastPathSegment(item.url)
                            ? "anchor-active"
                            : "anchor-inactive"
                        )}
                        disabled={loading}
                      >
                        <div
                          className={clsx({
                            "text-xl bg-primary h-full w-[2px] rounded-full":
                              currentSegment === getLastPathSegment(item.url),
                          })}
                        ></div>
                        <item.icon
                          className={clsx(
                            "icon-common",
                            currentSegment === getLastPathSegment(item.url)
                              ? "icon-active"
                              : "icon-inactive"
                          )}
                        />
                        <span>{loading ? "Logging out..." : item.title}</span>
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className={clsx(
                          "anchor-common",
                          currentSegment === getLastPathSegment(item.url)
                            ? "anchor-active"
                            : "anchor-inactive"
                        )}
                      >
                        <div
                          className={clsx({
                            "text-xl bg-primary h-full w-[2px] rounded-full":
                              currentSegment === getLastPathSegment(item.url),
                          })}
                        ></div>
                        <item.icon
                          className={clsx(
                            "icon-common",
                            currentSegment === getLastPathSegment(item.url)
                              ? "icon-active"
                              : "icon-inactive"
                          )}
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
