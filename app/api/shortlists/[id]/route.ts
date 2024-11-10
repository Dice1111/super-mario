import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
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

  
