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
      <main className="relative container top-40 mx-auto">{children}</main>
    </div>
  );
}
