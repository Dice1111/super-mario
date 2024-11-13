import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/authOptions";
import { Role } from "@prisma/client";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== Role.buyer) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await request.json();
  if (!data.car_id) {
    return NextResponse.json({ error: "Car ID is required" }, { status: 400 });
  }

  try {
    const existingEntry = await prisma.shortlist.findUnique({
      where: {
        listingId_userEmail: {
          listingId: data.car_id,
          userEmail: session.user.email!,
        },
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
