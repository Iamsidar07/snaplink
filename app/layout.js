import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { constructMetadata } from "@/utils";

const fontSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = constructMetadata({});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="light">
        <Provider>
          <body className={cn("antialiased", fontSans.variable)}>
            <div className="">
              <Navbar />
              {children}
              <Footer />
            </div>
            <Toaster />
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
