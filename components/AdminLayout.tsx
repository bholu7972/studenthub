
import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-grow bg-gray-100 min-h-screen min-w-[430px]">
        <div className="w-full">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
