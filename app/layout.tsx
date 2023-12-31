import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "SnapLink",
  description:
    "SnapLink is a free and open source URL shortener with custom domains and stats.",
  other: {
    "theme-color": "#0B101B",
    "color-scheme": "dark",
    "twitter:card": "summary_large_image",
    "twitter:image": "https://snaplink.vercel.app/twitter.png",
    "og:image": "https://snaplink.vercel.app/twitter.png",
    "og:type": "website",
    "og:url": "https://snaplink.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`bg-[#0B101B] text-[#C9CED6]`}>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          {children}
          <div className="w-20 h-20 sm:w-56 sm:h-56 bg-[#0E131E] rotate-45 shadow-2xl drop-shadow-2xl  backdrop-blur-2xl rounded-[32px] -z-10 fixed -top-[5%] right-[20%] "></div>
          <div className="w-20 h-20 sm:w-56 sm:h-56 bg-[#0E131E] rotate-45 shadow-2xl drop-shadow-2xl  backdrop-blur-2xl rounded-[32px] -z-10 fixed -bottom-[5%] left-[2%] "></div>
          <div className="w-20 h-20 sm:w-56 sm:h-56 bg-[#0E131E] rotate-45 shadow-2xl drop-shadow-2xl blur-sm  backdrop-blur-2xl rounded-[32px] -z-10 fixed top-[50%] right-[20%] "></div>
        </body>
      </html>
    </ClerkProvider>
  );
}
