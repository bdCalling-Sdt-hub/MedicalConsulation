// middleware.js

import { NextResponse } from "next/server";

export function middleware(request) {
  const role = request.cookies.get("userRole");
  const url = request.nextUrl.clone(); // Access the server-set cookie here
  // console.error(role, url);
  // console.log(role);

  // Protect routes based on the user role
  if (url.pathname.startsWith("/admin")) {
    if (role?.value == "admin") {
      console.log("is Admin");
    } else if (role?.value == "doctor") {
      url.pathname = "/doctor/dashboard";
      return NextResponse.redirect(url);
    } else if (role?.value == "patient") {
      url.pathname = "/patient/dashboard";
      return NextResponse.redirect(url);
    } else {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  } else if (url.pathname.startsWith("/doctor")) {
    if (role?.value == "admin") {
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    } else if (role?.value == "doctor") {
      console.log("is doctor");
    } else if (role?.value == "patient") {
      url.pathname = "/patient/dashboard";
      return NextResponse.redirect(url);
    } else {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  } else if (url.pathname.startsWith("/patient")) {
    if (role?.value == "admin") {
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    } else if (role?.value == "doctor") {
      url.pathname = "/doctor/dashboard";
      return NextResponse.redirect(url);
    } else if (role?.value == "patient") {
      console.log("is patient");
    } else {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/patient/:path*"],
};
