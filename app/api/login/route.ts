// Currently using NextAuth for authentication.
// code can be found under auth/authOptions.ts

// import prisma from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();

//     const existingUser = await prisma.user.findUnique({
//       where: { email: data.email },
//     });

//     if (!existingUser) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     if (data.password != existingUser.password) {
//       return NextResponse.json(
//         { error: "Incorrect email or password." },
//         { status: 401 }
//       );
//     }

//     return NextResponse.json(
//       { success: "Login Successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Something went wrong", details: error },
//       { status: 500 }
//     );
//   }
// }
