// app/(with-sidebar)/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import "./../globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { AppNavbar } from "@/components/AppNavbar";

export default function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
