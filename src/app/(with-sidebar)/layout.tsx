// app/(with-sidebar)/layout.tsx
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import "./../globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { AppNavbar } from "@/components/AppNavbar";
import { useEffect } from "react";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Apply saved theme or default to system preference
    const theme = localStorage.getItem("theme");
    const isDark =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="w-full">
        <AppNavbar />
        <div>
          <AuthProvider>{children}</AuthProvider>
        </div>
      </main>
    </SidebarProvider>
  );
}
