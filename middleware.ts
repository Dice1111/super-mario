import { Role } from "@prisma/client";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const isDisabled = process.env.MIDDLEWARE_DISABLED === "true";
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(isDisabled);
    if (isDisabled) {
      return NextResponse.next(); // Skip all checks
    }
    const { pathname } = request.nextUrl;

    // Check if user is not authenticated
    if (!request.nextauth.token) {
      return NextResponse.rewrite(new URL("/auth/adm", request.url));
    }

    // Check user role for specific routes
    if (
      pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== Role.admin
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    } else if (
      pathname.startsWith("/used_car_agent") &&
      request.nextauth.token?.role !== Role.agent
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    } else if (
      pathname.startsWith("/seller") &&
      request.nextauth.token?.role !== Role.seller
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    } else if (
      pathname === "/" &&
      request.nextauth.token?.role !== Role.buyer
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/used_car_agent/:path*", "/seller/:path*", "/"],
};
