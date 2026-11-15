import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./ambient.css";

export const metadata: Metadata = {
  title: "Sebin George | UI/UX & Graphic Designer",
  description:
    "Sebin George is a UI/UX and graphic designer from Kochi, Kerala, designing websites, web apps, SaaS dashboards and mobile apps with Figma and Adobe Photoshop.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#08080b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/fonts/inter-latin-500-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/instrument-serif-latin-400-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
