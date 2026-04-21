import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Amit Kumar Verma — AI & Full-Stack Developer",
  description:
    "Portfolio of Amit Kumar Verma — BSc Physics graduate, IIT Madras BS Data Science student. Building intelligent systems and immersive web experiences.",
  keywords: [
    "Amit Kumar Verma",
    "AI Developer",
    "Machine Learning",
    "Full Stack",
    "IIT Madras",
    "Portfolio",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Amit Kumar Verma — AI & Full-Stack Developer",
    description: "Building intelligent systems and immersive web experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
