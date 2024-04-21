import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Component } from "react";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Capital.",
  description: "Just connect. 60 seconds. Zero stakes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
