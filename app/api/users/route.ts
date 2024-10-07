import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get all users from database
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get users', details: error },
      { status: 500 },
    )
  }
}

export async function POST(req: Request) {
  // Get the user data from the request body
  const data = await req.json()

  try {
    // Create a new user in the database
    const newUser = await prisma.user.create({
      data,
    })

    return NextResponse.json(newUser)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user', details: error },
      { status: 500 },
    )
  }
}
