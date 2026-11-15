"use client";

import dynamic from "next/dynamic";

// The ported portfolio design relies on window, GSAP ScrollTrigger and Lenis, so it renders on the client only.
const App = dynamic(() => import("@/portfolio/App"), { ssr: false });

export default function PortfolioClient() {
  return <App />;
}
