import {
  Plus_Jakarta_Sans as PlusJakartaSans,
  Recursive,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { constructMetadata } from "@/utils";
import { ThemeProvider } from "@/components/themeProvider";
// import MagneticBall from "@/components/MagneticBall";

const fontSans = PlusJakartaSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const fontRecursive = Recursive({
  subsets: ["latin"],
  variable: "--font-recursive",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = constructMetadata({});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <Provider>
          <body
            className={cn(
              "antialiased",
              fontSans.variable,
              fontRecursive.variable,
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* <MagneticBall /> */}
              <div className="light:main">
                <div className="light:gradient"></div>
              </div>
              <div className="app">
                <Navbar />
                <div className="min-h-screen flex flex-col items-center sm:px-16 px-4 pt-24 sm:pt-24">
                  {children}
                </div>
                <Footer />
              </div>
              <Toaster />
            </ThemeProvider>
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
