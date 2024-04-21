import { authMiddleware } from "@clerk/nextjs";
import upload from "@/lib/multer";
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/api/url/")) {
    console.log("multer: ", request.body, request.file);
    upload.single("file");
  }
}

export default authMiddleware({
  publicRoutes: [
    "/",
    "/s/:path*",
    "/api/actualUrl",
    "/api/shortUrl",
    "/api/urlCount",
  ],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
