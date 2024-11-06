import type { Metadata } from "next";
import { ReactNode } from "react";

import * as React from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardSideBar from "@/components/SideBar/DashboardSideBar";

export const metadata: Metadata = {
  title: "Super Mario",
  description: "Used car dealership",
};
type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      {/* <AdminHeader /> */}
      <SidebarProvider>
        <DashboardSideBar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <main className="relative container mx-auto p-3">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
