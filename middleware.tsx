// middleware.js
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { toast } from "sonner";

interface JWTPayload {
  name: string;
  role: string;
  permission: string;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  
  try {
    if (!token) {
      // console.log("No token found, redirecting to signin");
      toast.error("Please login to access this page");
      return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
    }

    const url = new URL(req.url);
    const path = url.pathname;

    if (!path || typeof path !== "string") {
      // console.error("Path is undefined or not a string");
      toast.error("Invalid URL path");
      return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
    }

    if (path.length === 0) {
      // console.error("Path is empty");
      toast.error("Invalid URL path");
      return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
    }

    // Check role-based access
    if (
      (path.startsWith("/api/settings") ||
        path.startsWith("/api/login-info")) &&
      role !== "admin" &&
      role !== "temp-admin"
    ) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "authorization failed" }),
        {
          status: 401,
          headers: { "content-type": "application/json" },
        }
      );
    }

    return NextResponse.next();
  } catch (error) {
    // console.error("Token verification failed:", error);
    toast.error("Token verification failed");
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }
}

// Configure which paths the middleware should run for
export const config = {
  matcher: [
    "/api/settings/:path*",
    "/api/login-info/:path*",
    "/api/student-names/:path*",
    "/api/auth/logout/:path*",
    "/admin/:path*",
    "/students/:path*",
    "/teachers/:path*",
  ],
};
