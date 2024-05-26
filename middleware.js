import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });
  const url = request.nextUrl;
  if (
    (token && url.pathname.startsWith("/sign-in")) ||
    url.pathname.startsWith("/sign-up")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/dashboard",
    "/api/clicks/:path*",
    "/api/shortUrls/:path*",
    "/",
  ],
};
