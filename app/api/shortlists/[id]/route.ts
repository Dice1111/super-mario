import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET handler - Fetch shortlisted car listings for a user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

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

    // Return the used car listings
    return NextResponse.json({ usedCarListings }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch shortlist and car listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch shortlist and car listings" },
      { status: 500 }
    );
  }
}

// DELETE handler - Remove a shortlist entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams; // Get the shortlist ID from params

    // Find the shortlist entry by its ID
    const shortlistObj = await prisma.shortlist.findUnique({
      where: { id: id }, // Assuming `id` here is the primary key for the shortlist table
    });

    if (!shortlistObj) {
      return NextResponse.json(
        { error: "Shortlist not found" },
        { status: 404 }
      );
    }

    // Delete the shortlist entry
    await prisma.shortlist.delete({
      where: { id: id },
    });

    // Return success message
    return NextResponse.json(
      { message: "Shortlist entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting shortlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
