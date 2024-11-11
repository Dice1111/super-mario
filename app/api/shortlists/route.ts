import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/authOptions";
import { Role } from "@prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session?.user.role !== Role.buyer)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const shortlistsWithCarListings = await prisma.shortlist.findMany({
      where: {
        userEmail: session.user.email!,
      },
      select: {
        carlisting: true,
      },
    });

    const shortlistsWithCarListingsWithoutWrapperObj =
      shortlistsWithCarListings.map((shortlist) => shortlist.carlisting);

    return NextResponse.json(
      { shortlists: shortlistsWithCarListingsWithoutWrapperObj },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { error: "Failed to get users", details: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session?.user.role !== Role.buyer)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();

  try {
    // Check if the car is already in the shortlist for this user
    const existingEntry = await prisma.shortlist.findFirst({
      where: {
        userEmail: session.user.email!,
        listingId: data.car_id,
      },
    });

    if (existingEntry) {
      // If it exists, delete it to remove from the shortlist
      await prisma.shortlist.delete({
        where: {
          id: existingEntry.id,
        },
      });

      await prisma.usedCarListing.update({
        where: { id: data.car_id },
        data: {
          shortlistCount: {
            decrement: 1,
          },
        },
      });
      return NextResponse.json(
        { message: "Removed from shortlist" },
        { status: 200 }
      );
    } else {
      await prisma.shortlist.create({
        data: {
          userEmail: session.user.email!,
          listingId: data.car_id,
        },
      });

      await prisma.usedCarListing.update({
        where: { id: data.car_id },
        data: {
          shortlistCount: {
            increment: 1,
          },
        },
      });

      return NextResponse.json(
        { message: "Added to shortlist" },
        { status: 201 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}
