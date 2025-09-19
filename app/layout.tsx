import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext"; // ✅ import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Branded metadata for hackathon
export const metadata: Metadata = {
  title: "Pi Marketplace",
  description: "Hyperlocal marketplace built on Pi Network 🚀",
  icons: {
    icon: "/favicon.png", // place favicon.png (or .ico) under /public
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ All pages can now access AuthContext */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
