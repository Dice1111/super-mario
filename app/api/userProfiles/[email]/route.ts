import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { email: string };
}

export async function GET(request: NextRequest, { params: { email } }: Props) {
  try {
    const userObj = await prisma.userProfile.findUnique({
      where: { userEmail: email },
    });

    if (!userObj) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }
    return NextResponse.json(userObj, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
