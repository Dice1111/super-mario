import type { Metadata } from "next";
import Header from "@/components/Header/Header";
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
      <main className="relative container top-20 mx-auto px-2 sm:px-0">
        {children}
      </main>
    </div>
  );
}
