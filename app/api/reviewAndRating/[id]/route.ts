import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Directly access the params from the context (NextRequest)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const resolvedParams = await params;
    const { email } = resolvedParams;

    // Fetch reviews for the agent based on the provided email
    const reviewAndRatings = await prisma.agentReview.findMany({
      where: { agentEmail: email },
    });

    if (reviewAndRatings.length === 0) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    return NextResponse.json(reviewAndRatings, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
