import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type MenuType = {
  name: string;
  link: string;
};

export const successToast = {
  duration: 2000,
  style: {
    background: "green",
    color: "white",
  },
};

export const errorToast = {
  duration: 2000,
  style: {
    background: "red",
    color: "white",
  },
};

export const MenuItems: MenuType[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Explore",
    link: "/product/explore",
  },
  {
    name: "Loan Calculator",
    link: "/product/loan_calculator",
  },
  {
    name: "Popular Cars",
    link: "/product/popular",
  },
];

export const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"; // Fallback for local development
