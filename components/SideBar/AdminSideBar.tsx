"use client";

import { Calendar, Home, Inbox, Menu, Search, Settings } from "lucide-react";
import { useState } from "react";
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
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "User Accounts",
    url: "/admin/view/user_account",
    icon: Inbox,
  },
  {
    title: "User Profiles",
    url: "/admin/view/user_profile",
    icon: Calendar,
  },
];

export function AdminSideBar() {
  const [collapsed, setCollapsed] = useState(false); // state for collapse

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // toggle collapse state
  };

  return (
    <Sidebar
      className={`transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      <SidebarContent>
        {/* Toggle Button */}
        <button onClick={toggleSidebar} className="p-2 focus:outline-none">
          <Menu />
        </button>

        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "hidden" : ""}`}>
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="mr-2" />
                      {/* Hide title if sidebar is collapsed */}
                      <span className={`${collapsed ? "hidden" : ""}`}>
                        {item.title}
                      </span>
                    </Link>
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
