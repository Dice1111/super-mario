'use client'

import { baseUrl } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function UserSync() {
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    if (
      isSignedIn &&
      user?.primaryEmailAddress?.verification?.status === 'verified'
    ) {
      // Call the API route to sync the user
      fetch(`${baseUrl}/api/sync-users`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .catch((err) => console.error('Error syncing user:', err))
    }
  }, [isSignedIn, user])

  return <></>
}
