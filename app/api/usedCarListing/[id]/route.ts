import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  try {
    const usedCarlistingObj = await prisma.usedCarListing.findUnique({
      where: { id: id },
    });

    if (!usedCarlistingObj) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    return NextResponse.json(usedCarlistingObj, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest, { params: { id } }: Props) {
    try {
      const usedCarlistingObj = await prisma.usedCarListing.findUnique({
        where: { id: id },
      });
  
      if (!usedCarlistingObj) {
        return NextResponse.json({ error: "usedCarlisting Not Found" }, { status: 404 });
      }
  
      await prisma.usedCarListing.delete({
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
