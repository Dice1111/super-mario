import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import { ReactNode } from "react";
import Landing from "@/components/Landing/Landing";

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
      <Header />

      <Landing />

      <main className="relative container mx-auto px-2 sm:px-0 pt-20">
        {children}
      </main>
    </div>
  );
}
