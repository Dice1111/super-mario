import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import { ReactNode } from "react";

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
      <main className="relative container top-40 mx-auto">{children}</main>
    </div>
  );
}
