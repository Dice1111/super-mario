"use client";

import UserLogoutUI from "@/app/boundaries/UserUI/UserLogoutUI";
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
import { usePathname } from "next/navigation";
import * as React from "react";

const routeToDataMap = {
  "/admin": {
    user: {
      email: "no session",
      role: "Admin",
      avatar: "unknown",
    },
    teams: [
      {
        name: "Super Mario Kart",
        logo: GalleryVerticalEnd,
        plan: "Admin Dashboard",
      },
    ],
    navMain: [
      {
        title: "DashBoard",
        url: "/admin",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "User Accounts",
        url: "/admin/view/user_account",
        icon: Bot,
      },
      {
        title: "User Profiles",
        url: "/admin/view/user_profile",
        icon: BookOpen,
      },
      {
        title: "Search",
        url: "/admin/view/search",
        icon: BookOpen,
      },
    ],
  },
  "/used_car_agent": {
    user: {
      email: "no session",
      role: "Agent",
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
      {
        title: "Search Listing",
        url: "/used_car_agent/view/search",
        icon: BookOpen,
      },
    ],
  },
  "/seller": {
    user: {
      email: "no session",
      role: "Agent",
      avatar: "unknown",
    },
    teams: [
      {
        name: "Super Mario Kart",
        logo: GalleryVerticalEnd,
        plan: "Seller Dashboard",
      },
    ],
    navMain: [
      {
        title: "DashBoard",
        url: "/seller",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Seller Car Listings",
        url: "/seller/view/seller_car_listing",
        icon: Bot,
      },
      {
        title: "Used Car Agent Profiles",
        url: "/seller/view/used_car_agent_profile",
        icon: BookOpen,
      },
    ],
  },
  // Add more routes and their data configurations as needed
};

export default function DashboardSideBar() {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const boundary = UserLogoutUI.getInstance();

  // Find the first route in the map that matches the current path prefix
  const data = pathname
    ? Object.entries(routeToDataMap).find(([route]) =>
        pathname.startsWith(route)
      )?.[1] || {
        // Default sidebar data if no route matches
        user: {
          email: "no session",
          role: "Guest",
          avatar: "unknown",
        },
        teams: [
          {
            name: "Default Team",
            logo: GalleryVerticalEnd,
            plan: "Default Dashboard",
          },
        ],
        navMain: [
          {
            title: "Home",
            url: "/",
            icon: SquareTerminal,
            isActive: true,
          },
        ],
      }
    : {
        user: {
          email: "no session",
          role: "Guest",
          avatar: "unknown",
        },
        teams: [
          {
            name: "Default Team",
            logo: GalleryVerticalEnd,
            plan: "Default Dashboard",
          },
        ],
        navMain: [
          {
            title: "Home",
            url: "/",
            icon: SquareTerminal,
            isActive: true,
          },
        ],
      };

  const [activeTeam, setActiveTeam] = React.useState(data.teams[0]);

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
                    <AvatarFallback className="rounded-lg">
                      {data.user.role.charAt(0)}
                    </AvatarFallback>
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
                      <AvatarFallback className="rounded-lg">
                        {data.user.role.charAt(0)}
                      </AvatarFallback>
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
