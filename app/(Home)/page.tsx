'use client'
import { useUser } from '@clerk/nextjs'

export default function Home() {
  const { user, isSignedIn } = useUser()
  return (
    <div>
      <h1 className='text-4xl text-primary font-bold'>
        {isSignedIn
          ? `Welcome back, ${user.fullName}!`
          : 'You are not signed in.'}
      </h1>
    </div>
  )
}
