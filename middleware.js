import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/s/:path*",
    "/api/clicks",
    "/api/shortUrls",
    "/api/shortUrls/count",
    "/api/clicks/totalClicks"
  ],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
