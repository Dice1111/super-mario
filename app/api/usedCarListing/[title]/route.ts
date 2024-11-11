import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET request: Fetch used car listings based on title
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ title: string }> }
) {
  try {
    const resolvedParams = await params;
    const { title } = resolvedParams; // Destructure title from params
    const usedCarlistingObj = await prisma.usedCarListing.findMany({
      where: { title: title },
    });

    if (usedCarlistingObj.length === 0) {
      return NextResponse.json({ error: "Car Not Found" }, { status: 404 });
    }

    return NextResponse.json(
      { usedCarListings: usedCarlistingObj },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching car listings:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
