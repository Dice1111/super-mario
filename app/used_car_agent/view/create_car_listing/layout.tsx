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
  return <main className="relative container mx-auto p-3">{children}</main>;
}
