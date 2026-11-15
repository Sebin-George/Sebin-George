import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll is only used on devices with a fine pointer (not touch phones/tablets).
function shouldUseLenis() {
  return (
    !window.matchMedia("(hover: none) and (pointer: coarse)").matches &&
    (!(navigator.maxTouchPoints > 0) || !window.matchMedia("(max-width: 1024px)").matches)
  );
}

export default function SmoothScroll({ children }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const root = document.documentElement;
    root.style.overflowY = "auto";
    root.style.setProperty("scrollbar-width", "none");
    root.style.setProperty("-ms-overflow-style", "none");
    document.body.style.overflowY = "auto";
    document.body.style.setProperty("scrollbar-width", "none");
    document.body.style.setProperty("-ms-overflow-style", "none");

    if (!shouldUseLenis()) {
      return () => {
        root.style.overflowY = "";
        document.body.style.overflowY = "";
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true });
    window.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    let raf = 0;
    const tick = (time) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    const refresh = () => {
      lenis.resize();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", refresh);
    const timer = window.setTimeout(refresh, 150);

    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", refresh);
      lenis.destroy();
      delete window.lenis;
      root.style.overflowY = "";
      document.body.style.overflowY = "";
      ScrollTrigger.refresh();
    };
  }, []);

  return children;
}
