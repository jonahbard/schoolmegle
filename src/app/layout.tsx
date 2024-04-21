import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Component } from "react";
import { getSession } from "@/lib/session";
import { Providers } from "./providers";
import { SessionComponent } from "./session";
import { Navigation } from "./nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Capital.",
  description: "Just connect. 60 seconds. Zero stakes.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SessionComponent session={session}>
            <main className="p-4 min-h-screen flex flex-col justify-start">
              <Navigation />
              {children}
            </main>
          </SessionComponent>
        </Providers>
      </body>
    </html>
  );
}
