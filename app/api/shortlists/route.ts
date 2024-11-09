import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const shortlists = await prisma.shortlist.findMany({

    });

    return NextResponse.json({ shortlists: shortlists }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { error: "Failed to get users", details: error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // Get the shortlist data from the request body
  const data = await req.json();
  console.log(data);

  try {

    // Create a new shortlist in the database
    const newUser = await prisma.shortlist.create({
      data: {
        userEmail: data.userEmail,
        listingId: data.car_id,
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
