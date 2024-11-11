import prisma from "@/lib/db";
import { UserProfile } from "@prisma/client";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userProfile = await prisma.userProfile.findMany();

    return NextResponse.json({ userProfile }, { status: 200 });
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
    const userObj = await prisma.userProfile.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!userObj) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if ("status" in body) {
      const suspendedUserProfile = await prisma.userProfile.update({
        where: {
          id: userObj.id,
        },
        data: {
          status: body.status,
        },
      });
      return NextResponse.json(suspendedUserProfile);
    } else {
      const updatedUserProfile = await prisma.userProfile.update({
        where: {
          id: userObj.id,
        },
        data: {
          name: body.name,
          role: body.role,
          address: body.address,
          mobileNumber: body.mobileNumber,
        },
      });
      return NextResponse.json(updatedUserProfile);
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
  const data: UserProfile = await req.json();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.userEmail },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User Account not existed" },
        { status: 400 }
      );
    }

    const newUserProfile = await prisma.userProfile.create({
      data: {
        userEmail: data.userEmail,
        name: data.name,
        address: data.address,
        mobileNumber: data.mobileNumber,
        role: data.role,
      },
    });

    return NextResponse.json(newUserProfile, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}
