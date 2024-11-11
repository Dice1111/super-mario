import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const existingEntry = await prisma.shortlist.findFirst({
      where: {
        listingId: data.car_id,
        userEmail: data.userEmail,
      },
    });

    return NextResponse.json({ exists: !!existingEntry }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}
