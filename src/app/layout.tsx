import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { RecipeProvider } from "@/context/RecipeContext";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CineCookbook — Video-First Recipe Studio",
  description: "Interactive video recipes with live search, custom bookmarks, step timestamps, and recipe publishing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="font-sans bg-[#070a12] text-slate-100 flex flex-col min-h-screen">
        <RecipeProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="border-t border-slate-800/80 bg-[#090d16] py-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} CineCookbook Studio. Next.js 14 & Cloudinary Powered.
          </footer>
        </RecipeProvider>
      </body>
    </html>
  );
}
