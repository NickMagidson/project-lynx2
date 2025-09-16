import "@carbon/styles/css/styles.css";
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
  icons: {
    icon: "/icons8-satellite-96.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons8-satellite-96.png" sizes="any" />
        <link rel="icon" href="/icons8-satellite-96.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
