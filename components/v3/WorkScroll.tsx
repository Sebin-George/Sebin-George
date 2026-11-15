"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WorkWindow = Window & { __workGoto?: (i: number) => void };

// Phones and tablets: scrolling down slides the project cards sideways, one by one, while the Projects section stays put.
// When the last card has been shown, the page carries on to the next section. Each flick snaps to the next card.
export default function WorkScroll() {
  useEffect(() => {
    const sec = document.getElementById("work");
    const stack = sec?.querySelector<HTMLElement>(".stack");
    if (!sec || !stack) return;

    const mm = gsap.matchMedia();
    // not for very short (landscape) screens: a pinned card would be taller than the screen, so those keep the normal swipe row
    mm.add("(max-width: 1000px) and (min-height: 560px)", () => {
      const n = stack.children.length;
      if (n < 2) return;
      // the page-wide CSS smooth scrolling fights the snap (the snap scrolls the page itself), so it is off while this is active
      const root = document.documentElement;
      const prevBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      stack.classList.add("h-pin");
      sec.classList.add("work-pinned");

      const dist = () => Math.max(0, stack.scrollWidth - stack.clientWidth);
      const tween = gsap.to(stack, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          id: "work-h",
          trigger: sec,
          start: "top top",
          end: () => "+=" + Math.round((n - 1) * window.innerHeight * 0.75),
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / (n - 1), inertia: false, duration: { min: 0.15, max: 0.5 }, ease: "power2.inOut", delay: 0.04 },
          onUpdate: (self) => window.dispatchEvent(new CustomEvent("work:index", { detail: Math.round(self.progress * (n - 1)) })),
        },
      });

      (window as WorkWindow).__workGoto = (i: number) => {
        const st = ScrollTrigger.getById("work-h");
        if (st) window.scrollTo({ top: st.start + ((st.end - st.start) * i) / (n - 1), behavior: "smooth" });
      };

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(stack, { clearProps: "transform" });
        root.style.scrollBehavior = prevBehavior;
        stack.classList.remove("h-pin");
        sec.classList.remove("work-pinned");
        delete (window as WorkWindow).__workGoto;
      };
    });

    const settle = () => ScrollTrigger.refresh();
    window.addEventListener("load", settle);
    const t = window.setTimeout(settle, 700);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", settle);
      mm.revert();
    };
  }, []);

  return null;
}
