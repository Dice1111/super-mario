import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const AdminHeader = () => {
  return (
    <header className='bg-primary fixed z-10 w-full font-bold'>
        <ul className='text-secondary container mx-auto flex items-center p-4'>
            
            <li className='ml-auto'>

                <Link href={'/auth/login'}>
                    <Button variant={'secondary'}>Logout</Button>
              </Link>
            </li>
        </ul>
    </header>
  
  )
}

export default AdminHeader