import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "야왕 - 건강 지식 플랫폼",
  description: "70·80대도 쉽게 사용하는 건강 지식 커뮤니티",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">
        <Header />
        <main className="pt-14 pb-16 min-h-screen">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
