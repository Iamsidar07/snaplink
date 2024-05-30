import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { cn, constructMetadata } from "@/lib/utils";
import { Bricolage_Grotesque } from "next/font/google";

const sans = Bricolage_Grotesque({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = constructMetadata({});

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={cn(
          "antialiased flex flex-col min-h-full bg-background",
          sans.variable,
        )}
      >
        <div className="pointer-events-none fixed bottom-0 left-1 right-1 top-1 rounded-t-xl bg-background/80 -z-[1]"></div>
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-2 bg-black"></div>
        <div className="pointer-events-none fixed bottom-0 left-1 right-1 top-1 z-[101] rounded-t-xl shadow-[0_1px_1px_rgba(0,0,0,0.5),0_4px_6px_rgba(32,42,54,0.04),0_24px_68px_rgba(47,48,56,0.15),0_2px_3px_rgba(0,0,0,0.09)] ring-1 ring-inset ring-white/10 overflow-x-hidden"></div>

        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
