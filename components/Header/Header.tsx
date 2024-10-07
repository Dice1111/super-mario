'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MenuItems } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { CiShoppingCart } from 'react-icons/ci'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Header() {
  const [isNav, setNav] = useState<boolean>(false) // keep track of the nav state on mobile

  useEffect(() => {
    console.log(isNav)
  }, [isNav])

  return (
    <header className={'fixed w-full bg-primary font-bold z-10'}>
      <ul className='flex container mx-auto justify-between items-center py-4 px-2 sm:px-0 text-secondary'>
        <li>
          <h1 className='text-2xl'>Super Mario</h1>
        </li>
        <li>
          <ul className='justify-center items-center gap-8 hidden md:flex'>
            {MenuItems.map((item, index) => (
              <Link
                className='hover:-translate-y-2 text-lg transition-all duration-200 ease-in-out cursor-pointer p-3'
                key={index}
                href={item.link}
              >
                <li>{item.name}</li>
              </Link>
            ))}
          </ul>
          <ul className='block md:hidden' onClick={() => setNav(!isNav)}>
            <DropdownMenu>
              <DropdownMenuTrigger className='pt-3 outline-none border-none'>
                <RxHamburgerMenu className='text-white text-2xl cursor-pointer' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-primary border-primary outline-primary text-white p-2'>
                {MenuItems.map((item, index) => (
                  <Link href={item.link} key={index}>
                    <DropdownMenuItem className='text-lg cursor-pointer'>
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
        </li>
        <li>
          <ul className='flex justify-center items-center gap-8'>
            <li>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link href={'/auth/sign-in'}>
                  <Button variant={'secondary'}>Login</Button>
                </Link>
              </SignedOut>
            </li>
            <li>
              <Link href={'/cart'} className='relative'>
                <CiShoppingCart className='text-3xl' />
                <Badge
                  variant={'secondary'}
                  className='rounded-full w-5 h-5 grid place-items-center p-0 absolute -top-3 -right-2'
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
