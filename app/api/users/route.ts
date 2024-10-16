import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const usersWithProfile = await prisma.user.findMany({
      include: {
        UserProfile: true,
      },
    })

    // Log the users to verify the structure
    console.log('Users with profile:', usersWithProfile)

    return NextResponse.json({ users: usersWithProfile }, { status: 200 })
  } catch (error) {
    console.error('Error fetching users:', error)

    return NextResponse.json(
      { error: 'Failed to get users', details: error },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  // Get the user data from the request body
  const data = await req.json()

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findFirst({
      where: { email: data.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    })

    const userProfile = await prisma.userProfile.create({
      data: {
        userId: newUser.id,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    })

    const newUserWithProfile = {
      ...newUser,
      ...userProfile,
    }

    return NextResponse.json(newUserWithProfile, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong', details: error },
      { status: 500 }
    )
  }
}
