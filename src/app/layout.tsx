import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "antd/dist/reset.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Header from '@/components/common/Header';
import { AuthSyncProvider } from '@/components/providers/AuthSyncProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "拼团旅游 - 实时在线拼团旅游平台",
  description: "实时在线拼团旅游系统，整合吃住行娱购五大核心模块，享受团购优惠价格",
  keywords: "拼团旅游, 团购旅游, 实时拼团, 旅游优惠",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <AuthSyncProvider />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </AntdRegistry>
      </body>
    </html>
  );
}
