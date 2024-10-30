import type { Metadata } from "next";
import { ReactNode } from "react";
import AdminSideBar from "@/components/SideBar/AdminSideBar";

import * as React from "react";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
        <AdminSideBar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <main className="relative container mx-auto sm:px-0">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
