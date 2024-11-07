
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


export async function POST(req: Request) {
  const body = await req.json();

  try {
    // Create a new review
    const newReview = await prisma.agentReview.create({
      data: {
        comment: body.comment,
        rating: body.rating,
        agentEmail: body.agentEmail,
        userEmail: body.userEmail,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}