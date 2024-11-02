import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


interface Props {
    params: { email: string };
  }
  
  export async function GET(request: NextRequest, { params: { email } }: Props) {
    try {
      const reviewAndRatings = await prisma.agentReview.findMany({
        where: { agentEmail: email },
      });
  
      if (!reviewAndRatings) {
        return NextResponse.json({ error: "User Not Found" }, { status: 404 });
      }
      return NextResponse.json(reviewAndRatings, { status: 200 });
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }