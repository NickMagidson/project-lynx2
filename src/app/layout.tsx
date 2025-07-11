import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Lynx 2.0",
  description: "A satellite tracking application using Next.js 14 and Cesium",
  openGraph: {
    type: "website",
    siteName: "Project Lynx 2.0",
    title: "Project Lynx 2.0",
    description: "A satellite tracking application using Next.js 14 and Cesium",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
