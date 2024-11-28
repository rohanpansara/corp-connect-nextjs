// app/(with-sidebar)/layout.tsx

import { AppNavbar } from "@/components/common/AppNavbar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { AuthProvider } from "@/components/common/AuthProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCookieAsString } from "@/utils/cookieUtils";
import "./../globals.css";


export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = getCookieAsString("User_Id");

  return (
    <SidebarProvider>
      <AppSidebar userId={userId} />
      <SidebarTrigger />
      <main className="w-full">
        <AppNavbar />
        <AuthProvider>{children}</AuthProvider>
      </main>
    </SidebarProvider>
  );
}
