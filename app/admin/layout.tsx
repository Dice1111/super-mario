import type { Metadata } from "next";
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSideBar } from "@/components/SideBar/AdminSideBar";
import AdminHeader from "@/components/Header/AdminHeader";

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
      <AdminHeader />
      <SidebarProvider>
        <AdminSideBar />
        <main className="relative container top-20 mx-auto px-2 sm:px-0">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
