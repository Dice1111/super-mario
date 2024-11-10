import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}



export async function GET(request: NextRequest, { params: { id } }: Props) {
  try {
    // Get shortlist entries for the specified user
    const shortlists = await prisma.shortlist.findMany({
      where: { userEmail: id },
    });

    // Extract listing IDs from the shortlist entries
    const listingIds = shortlists.map((shortlist) => shortlist.listingId);

    // Fetch car listings with matching listing IDs from usedCarListing
    const usedCarListings = await prisma.usedCarListing.findMany({
      where: {
        id: { in: listingIds },
      },
    });

    return NextResponse.json({ usedCarListings }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch shortlist and car listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch shortlist and car listings" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest, { params: { id } }: Props) {
    try {

      const shortlistObj = await prisma.shortlist.findUnique({
        where: { id: id },
      });
  
      if (!shortlistObj) {
        return NextResponse.json({ error: "usedCarlisting Not Found" }, { status: 404 });
      }
  
      await prisma.shortlist.delete({
        where: { id: id },
      });
  
      return NextResponse.json({ message: "usedCarlistingObj deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  
