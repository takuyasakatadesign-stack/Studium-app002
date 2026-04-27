import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppShell } from "@/components/layout/app-shell";
import { StadiumDataProvider } from "@/components/providers/stadium-data-provider";
import { getCurrentRole } from "@/lib/auth";
import { fetchMatchData } from "@/lib/data-adapter";

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
  title: "スタジアム運営最適化システム",
  description: "ホームゲーム運営を一元管理するWebプロトタイプ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentRole = await getCurrentRole();
  const initialData = await fetchMatchData();

  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <StadiumDataProvider initialData={initialData}>
          <AppShell currentRole={currentRole}>{children}</AppShell>
        </StadiumDataProvider>
      </body>
    </html>
  );
}
