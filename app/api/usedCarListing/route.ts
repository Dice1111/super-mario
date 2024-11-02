
import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const carListings = await prisma.usedCarListing.findMany();

    return NextResponse.json({ usedCarListings: carListings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching carlistings:", error);

    return NextResponse.json(
      { error: "Failed to get carlistings", details: error },
      { status: 500 }
    );
  }
}




export async function PUT(request: Request) {
  const body = await request.json();
  try {
    const carListingObj = await prisma.usedCarListing.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!carListingObj){
        
        return NextResponse.json({ error: "Car Listing not found" }, { status: 404 });
    }

  
    const updatedCarListing = await prisma.usedCarListing.update({
    where: {
        id: carListingObj.id,
    },
    data: {
        title: body.title,
        agentEmail: body.agentEmail,
        sellerEmail: body.sellerEmail,
        mileage: body.mileage,
        color: body.color,
        condition: body.condition,
        imgUrl: body.imgUrl,
        manufacturedYear: body.manufacturedYear,
        price: body.price,
        description: body.description
    },
    });

      return NextResponse.json(updatedCarListing);
    }
    catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
    // Get the used car listing data from the request body
    const body = await req.json();
  
    try {
      // Check if the used car listing already exists
      const existingUsedCarListing = await prisma.usedCarListing.findFirst({
        where: { id: body.id },
      });
  
      if (existingUsedCarListing) {
        return NextResponse.json(
          { error: "Used car listing already exists" },
          { status: 400 }
        );
      }
  
      // Create a new used car listing in the bodybase
      const newUsedCarListing = await prisma.usedCarListing.create({
        data: {
          title: body.title,
          agentEmail: body.agentEmail,
          sellerEmail: body.sellerEmail,
          mileage: body.mileage,
          color: body.color,
          condition: body.condition,
          imgUrl: body.imgUrl,
          manufacturedYear: body.manufacturedYear,
          price: body.price,
          description: body.description
        },
      });
  
      return NextResponse.json(newUsedCarListing, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: "Something went wrong", details: error },
        { status: 500 }
      );
    }
  }
