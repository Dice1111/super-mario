"use client";

import UserLogoutUI from "@/app/boundaries/AdminUI/UserLogoutUI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Bot,
  ChevronsUpDown,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import * as React from "react";

// This is sample data.
const data = {
  user: {
    email: "no session",
    role: "unknown",
    avatar: "unknown",
  },
  teams: [
    {
      name: "Super Mario Kart",
      logo: GalleryVerticalEnd,
      plan: "Used Car Agent Dashboard",
    },
  ],
  navMain: [
    {
      title: "DashBoard",
      url: "/used_car_agent",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Used Car Listings",
      url: "/used_car_agent/view/used_car_listing",
      icon: Bot,
    },
    {
      title: "User Reviews",
      url: "/used_car_agent/view/user_review",
      icon: BookOpen,
    },
  ],
};

export default function UsedCarAgentSideBar() {
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);
  const { status, data: session } = useSession();
  const boundary = UserLogoutUI.getInstance();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <activeTeam.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <Link href={item.url}>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={data.user.avatar} alt={data.user.role} />
                    <AvatarFallback className="rounded-lg">AG</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {status === "authenticated" && session
                        ? session.user.email
                        : "Unknown User"}
                    </span>
                    <span className="truncate text-xs">
                      {" "}
                      {status === "authenticated" && session
                        ? session.user.role
                        : "Unknown Role"}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.role}
                      />
                      <AvatarFallback className="rounded-lg">AG</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {status === "authenticated" && session
                          ? session.user.email
                          : "Unknown User"}
                      </span>
                      <span className="truncate text-xs">
                        {status === "authenticated" && session
                          ? session.user.role
                          : "Unknown Role"}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  {boundary.displayLogoutUI()}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
