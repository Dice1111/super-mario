
import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const reviews = await prisma.agentReview.findMany();

    return NextResponse.json({ reviews: reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching carlistings:", error);

    return NextResponse.json(
      { error: "Failed to get carlistings", details: error },
      { status: 500 }
    );
  }
}