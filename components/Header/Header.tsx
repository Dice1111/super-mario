'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MenuItems } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { CiShoppingCart } from 'react-icons/ci'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

export default function Header() {
  const [isNav, setNav] = useState<boolean>(false) // keep track of the nav state on mobile

  return (
    <header className={'bg-primary fixed z-10 w-full font-bold'}>
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
              <Link href={'/auth/signup'}>
                <Button variant={'secondary'}>Login</Button>
              </Link>
            </li>
            <li>
              <Link href={'/cart'} className="relative">
                <CiShoppingCart className="text-3xl" />
                <Badge
                  variant={'secondary'}
                  className="absolute -right-2 -top-3 grid h-5 w-5 place-items-center rounded-full p-0"
                >
                  {0}
                </Badge>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  )
}
