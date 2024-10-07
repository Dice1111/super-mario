// app/api/sync-user/route.ts
import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { createAuthControl } from '@/controls/services/authService'

export async function POST() {
  const authControl = createAuthControl()

  try {
    // Get the current user from Clerk
    const user = await currentUser()

    // Check if the user exists and if the email is verified
    if (
      !user ||
      user.primaryEmailAddress?.verification?.status !== 'verified'
    ) {
      return NextResponse.json({ error: 'Email not verified' }, { status: 400 })
    }

    // Call checkUser to ensure user is not created twice
    const dbUser = await authControl.checkUser()

    if (dbUser) {
      // Return response for existing user
      return NextResponse.json(
        { message: 'User already exists', user: dbUser },
        { status: 200 },
      )
    }

    // The user will be created inside checkUser() if not found
    return NextResponse.json(
      { message: 'User created successfully', user: dbUser },
      { status: 201 },
    )
  } catch (error) {
    // Return detailed error message
    console.error('Failed to create user:', error)
    return NextResponse.json(
      { error: 'Failed to create user', details: error },
      { status: 500 },
    )
  }
}
