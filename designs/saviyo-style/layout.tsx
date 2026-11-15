import type { Metadata } from "next";
import "@/portfolio/styles/074_dzl0zdxfa.css";
import "@/portfolio/styles/1_4pyg72aj06o.css";
import "@/portfolio/styles/17sbhnday_agp.css";
import "./cube.css";
import { PERSONAL_DATA } from "@/portfolio/data/personal";

export const metadata: Metadata = {
  title: PERSONAL_DATA.meta.title,
  description: PERSONAL_DATA.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className="geist_a71539c9-module__T19VSG__variable geist_mono_8d43a2aa-module__8Li5zG__variable antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
