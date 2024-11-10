"use client";

import UserLogoutUI from "@/app/boundaries/UserUI/UserLogoutUI";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuItems } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const { data: session } = useSession();
  const [isNav, setNav] = useState<boolean>(false); // Track nav state on mobile
  const [scrolled, setScrolled] = useState(false); // Track scroll state

  const isHomePage = usePathname() === "/";

  useEffect(() => {
    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <header
      className={`fixed z-10 w-full font-bold transition-all duration-300 ${
        scrolled ? "bg-primary" : ""
      }`}
    >
      <ul className="text-secondary container mx-auto flex items-center justify-between px-2 py-4 sm:px-0">
        <li>
          <h1 className="text-2xl">Super Mario</h1>
        </li>

        <li>
          <ul className="hidden items-center justify-center gap-8 md:flex">
            {MenuItems.map((item, index) => (
              <Link
                className="cursor-pointer p-3 text-lg transition-all duration-200 ease-in-out hover:-translate-y-2"
                key={index}
                href={item.link}
              >
                <li>{item.name}</li>
              </Link>
            ))}
          </ul>
          <ul className="block md:hidden" onClick={() => setNav(!isNav)}>
            <DropdownMenu>
              <DropdownMenuTrigger className="border-none pt-3 outline-none">
                <RxHamburgerMenu className="cursor-pointer text-2xl text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-primary border-primary outline-primary p-2 text-white">
                {MenuItems.map((item, index) => (
                  <Link href={item.link} key={index}>
                    <DropdownMenuItem className="cursor-pointer text-lg">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
        </li>
        <li>
          <ul className="flex items-center justify-center gap-8">
            <li>
              <p className="text-sm">
                {session ? session?.user?.email : "unknown user"}
              </p>
            </li>
            <li>{UserLogoutUI.getInstance().displayLogoutUI()}</li>
            <li>
              <Link href={"/product/shortlist"} className="relative">
                <CiShoppingCart className="text-3xl" />
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}
