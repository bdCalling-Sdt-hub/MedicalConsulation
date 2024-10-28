// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const role = request.cookies.get("userRole");
  console.log(role);
  // Retrieve the user role from cookies
  const url = request.nextUrl.clone();

  // Protect routes based on the user role
  if (url.pathname.startsWith("/admin/dashboard") && role !== "admin") {
    url.pathname = "/unauthorized"; // Redirect to an unauthorized page or login
    return NextResponse.redirect(url);
  }
  if (url.pathname.startsWith("/doctor/dashboard") && role !== "doctor") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }
  if (url.pathname.startsWith("/patient/dashboard") && role !== "patient") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  // Allow the request if all checks pass
  return NextResponse.next();
}

// Define routes where the middleware applies
export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/doctor/dashboard/:path*",
    "/patient/dashboard/:path*",
  ],
};
