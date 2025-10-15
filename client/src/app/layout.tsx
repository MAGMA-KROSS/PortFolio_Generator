import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiquidEther from "../../LiquidEther/LiquidEther";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MagmaBuiler",
  description: "Showcase your skills and projects with a beautiful portfolio. Select a template, customize it to your style, and go live in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        <div className="" style={{ position: 'fixed', inset: 0, zIndex: -10 }}>
          {/* <LiquidEther /> */}
        </div>
        <main>
     
          {children}
        
        </main>
      </body>
    </html>
  );
}
