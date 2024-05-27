import { auth } from "@/auth";
export default auth((req) => {
  const url = req.nextUrl;
  if (
    req.auth &&
    (url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-in"))
  ) {
    return Response.redirect(new URL("/dashboard", req.url));
  }
  if (!req.auth && url.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/sign-up",
    "/sign-in",
    "/api/shortUrls/:path*",
    "/api/clicks/:path*",
  ],
};
