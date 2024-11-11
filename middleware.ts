import { Role } from "@prisma/client";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const isDisabled = process.env.MIDDLEWARE_DISABLED === "true";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (isDisabled) {
      return NextResponse.next(); // Skip all checks
    }

    const { pathname } = request.nextUrl;

    // Check if user is not authenticated
    if (!request.nextauth.token) {
      return NextResponse.rewrite(new URL("/auth/login", request.url));
    }

    const userRole = request.nextauth.token?.role;

    // Use switch case to handle role-based path checks
    switch (true) {
      case pathname.startsWith("/admin") && userRole !== Role.admin:
        return NextResponse.rewrite(new URL("/denied", request.url));
      case pathname.startsWith("/used_car_agent") && userRole !== Role.agent:
        return NextResponse.rewrite(new URL("/denied", request.url));
      case pathname.startsWith("/seller") && userRole !== Role.seller:
        return NextResponse.rewrite(new URL("/denied", request.url));
      case (pathname === "/" || pathname.startsWith("/product")) &&
        userRole !== Role.buyer:
        return NextResponse.rewrite(new URL("/denied", request.url));
      default:
        return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/used_car_agent/:path*",
    "/seller/:path*",
    "/",
    "/product/:path*",
  ],
};
