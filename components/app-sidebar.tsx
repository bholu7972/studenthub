"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";
import {
  Home,
  CircleUser,
  Inbox,
  Users,
  Search,
  Settings,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // useSidebar,
  //   SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: CircleUser,
  },
  {
    title: "Inbox",
    url: "/admin/inbox",
    icon: Inbox,
  },
  {
    title: "Search",
    url: "/admin/search",
    icon: Search,
  },
  {
    title: "Students",
    url: "/admin/students",
    icon: Users,
  },
  {
    title: "Teachers",
    url: "/admin/teachers",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/auth/logout",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  //   const {
  //     state,
  //     open,
  //     setOpen,
  //     openMobile,
  //     setOpenMobile,
  //     isMobile,
  //     toggleSidebar,
  //   } = useSidebar();

  const logoutUser = async () => {
    setIsLoading(true);
    // Call the logout API route
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    setIsLoading(false);
    if (response.ok) {
      // Redirect the user to the login page
      router.push("/auth/signin");
    } else {
      console.error("Logout failed");
      toast.error("Logout failed");
    }
  };

  const handleClicked = (url: string) => {
    if (url === "/auth/logout") {
      logoutUser();
    } else {
      router.push(url);
    }
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isLoading && <Loading size="sm" />}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl md:text-2xl font-bold mb-2">
            StudentHub
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {/* <div className="flex items-center gap-2 px-4 py-2">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="text-xl font-bold text-slate-600">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm md:text-base font-semibold text-slate-700">
                {username}
              </span>
            </div> */}
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      className={`flex items-center gap-2 p-4 hover:bg-slte-100 cursor-pointer select-none ${
                        pathname === item.url ? "bg-slate-100" : ""
                      }`}
                      onClick={() => handleClicked(item.url)}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <item.icon strokeWidth={1.5} />
                      </div>
                      <span className="text-sm md:text-base">{item.title}</span>
                    </button>
                    {/* <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem key="Logout">
            <SidebarMenuButton asChild>
              <a href="#">
                <Settings />
                <span>Logout</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
    </Sidebar>
  );
}
