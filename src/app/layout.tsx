import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnimatedStarsBg } from "@/components/AnimatedStarsBg";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VYBE SuperApp – Coming Soon",
  description:
    "The ultimate super app combining food delivery and rider services. Pre-register now for 30% launch discount.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimatedStarsBg />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
