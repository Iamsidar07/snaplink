import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/s/:path*",
    "/api/actualUrl",
    "/api/shortUrl",
    "/api/urlCount",
    "/api/url/:id*",
  ],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
