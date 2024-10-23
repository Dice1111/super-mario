import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AdminHeader from '@/components/Header/AdminHeader'

export const metadata: Metadata = {
  title: 'Super Mario',
  description: 'Used car dealership',
}
type RootLayoutProps = {
  children: ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <AdminHeader />
      <SidebarProvider>
        <AppSidebar />
        <main className='relative container top-20 mx-auto px-2 sm:px-0'>
            
          {children}
        </main>
      </SidebarProvider>
      
    </div>
  )
}
