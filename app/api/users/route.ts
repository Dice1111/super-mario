import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const usersWithProfile = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });

    return NextResponse.json({ users: usersWithProfile }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { error: "Failed to get users", details: error },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  const body = await request.json();
  try {
    const userObj = await prisma.user.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!userObj)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (body.password) {
      const updatedUser = await prisma.user.update({
        where: {
          id: userObj.id,
        },
        data: {
          password: body.password,
        },
      });
      return NextResponse.json(updatedUser);
    } else {
      console.log("Updating Suspend :", body.status);
      const suspendUser = await prisma.user.update({
        where: {
          id: userObj.id,
        },
        data: {
          status: body.status,
        },
      });
      return NextResponse.json(suspendUser);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // Get the user data from the request body
  const data = await req.json();

  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}
