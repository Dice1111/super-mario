import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type MenuType = {
  name: string;
  link: string;
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
    name: "Contact",
    link: "/contact",
  },
];

export const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"; // Fallback for local development


export const checkCarInShortList = async (car_id: string, userEmail: string): Promise<boolean> => {
  try {
    const response = await fetch(`${baseUrl}/api/shortlists/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ car_id, userEmail }),
    });

    if (!response.ok) {
      console.log("Failed to fetch shortlist status");
      return false;
    }

    const data = await response.json();


    return Boolean(data.exists); // Return true if `exists` is true, false otherwise
  } catch (error) {
    console.error("Error fetching shortlist status:", error);
    return false;
  }
};


