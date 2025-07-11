import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const geistSans = Quicksand({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHIKA",
  // description: "Generated by SAMSAN TECH",
  icons: {
    icon: '/header/logo.svg',
    apple: '/header/logo.svg',
    shortcut: '/header/logo.svg'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased bg-[#FFFDF2]`}
      >
        {children}
      </body>
    </html>
  );
}
