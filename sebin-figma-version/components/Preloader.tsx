"use client";

import { useEffect, useRef, useState } from "react";

const NAME = "SEBIN".split("");

// Intro loading screen: a big percentage counter, the name rising letter by letter in the bottom-right corner,
// then the black cover fades out, the name settles, and the hero entrance starts (html.entered).
export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "revealing" | "settled">("loading");
  const cover = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const nameBox = useRef<HTMLDivElement>(null);

  // progress counter
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.classList.add("entered");
      setPhase("settled");
      return;
    }
    root.style.overflow = "hidden";
    const w = window as unknown as Record<string, unknown>;
    const t0 = performance.now();
    let shown = 0;
    let done = false;
    let raf = 0;
    const tick = () => {
      if (done) return;
      const t = performance.now() - t0;
      const ready = w.__sceneReady === true;
      const target = ready
        ? Math.floor(100 * (1 - Math.pow(1 - Math.min(1, Math.max(0, (t - 150) / 950)), 3)))
        : Math.floor((1 - Math.pow(1 - Math.min(1, t / 2200), 2)) * 88);
      if (shown < target) {
        shown = Math.min(target, shown + Math.max(1, Math.ceil((target - shown) * 0.2)));
        if (num.current) num.current.textContent = shown < 100 ? String(shown).padStart(2, "0") : "100";
      }
      if (shown >= 100 && t >= 1200 && (ready || t >= 6000)) {
        done = true;
        if (num.current) num.current.textContent = "100";
        window.setTimeout(() => setPhase("revealing"), 120);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      done = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  // reveal sequence
  useEffect(() => {
    if (phase !== "revealing") return;
    const root = document.documentElement;
    root.classList.add("entered");
    root.style.overflow = "";
    window.dispatchEvent(new CustomEvent("hero:entry-start"));
    const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
    cover.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 800, easing: ease, fill: "forwards" });
    counter.current?.animate(
      [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(0.92)" }],
      { duration: 550, easing: ease, fill: "forwards" }
    );
    const mobile = window.innerWidth < 640;
    const anim = nameBox.current?.animate(
      [{ transform: `scale(${mobile ? 1.55 : 1.85})` }, { transform: "scale(1)" }],
      { duration: 850, easing: ease, fill: "forwards" }
    );
    if (anim) anim.onfinish = () => setPhase("settled");
    else setPhase("settled");
  }, [phase]);

  if (phase === "settled") return null;

  return (
    <div className="preloader" aria-label="Loading portfolio" aria-busy={phase === "loading"}>
      <div ref={cover} className="preloader-cover" style={{ pointerEvents: phase === "loading" ? "auto" : "none" }} />
      <div ref={counter} className="preloader-count">
        <span ref={num}>00</span>
        <i>%</i>
      </div>
      <div className="preloader-name-wrap">
        <div ref={nameBox} className="preloader-name" style={{ transform: "scale(1.85)" }}>
          {NAME.map((ch, i) => (
            <span key={i} className="pl-mask">
              <span className="pl-letter" style={{ animationDelay: `${0.1 + 0.08 * i}s` }}>
                {ch}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
