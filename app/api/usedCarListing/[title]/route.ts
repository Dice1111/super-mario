import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { title: string };
}

export async function GET(request: NextRequest, { params: { title } }: Props) {
  try {
    const usedCarlistingObj = await prisma.usedCarListing.findMany({
      where: { title: title },
    });

    if (!usedCarlistingObj) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    return NextResponse.json({usedCarListings:usedCarlistingObj}, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params: { title } }: Props) {
  try {
    const usedCarlistingObj = await prisma.usedCarListing.findUnique({
      where: { id: title },
    });

    if (!usedCarlistingObj) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    // Increment the view count
    const updatedListing = await prisma.usedCarListing.update({
      where: { id: title },
      data: {
        viewCount: {
          increment: 1, // Add 1 to the current view count
        },
      },
    });

    return NextResponse.json({usedCarListings:usedCarlistingObj}, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params: { title } }: Props) {
    try {

      const usedCarlistingObj = await prisma.usedCarListing.findUnique({
        where: { id: title },
      });
  
      if (!usedCarlistingObj) {
        return NextResponse.json({ error: "usedCarlisting Not Found" }, { status: 404 });
      }
  
      await prisma.usedCarListing.delete({
        where: { id: title },
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

  
