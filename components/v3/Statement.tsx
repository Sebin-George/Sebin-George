"use client";

import { useEffect, useRef } from "react";

const TEXT = "I turn business requirements into clear, attractive and user-friendly designs, from the first wireframe to developer handoff.";
const WORDS = TEXT.split(" ");
const ACCENT = new Set(["user-friendly", "handoff."]);


// The statement lights up word by word as you scroll through it.
export default function Statement() {
  const block = useRef<HTMLParagraphElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = block.current;
    const sec = wrap.current;
    if (!p || !sec) return;
    const reduced = false;
    const words = Array.from(p.querySelectorAll<HTMLElement>(".st-w"));
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

    // ---- 1) word-by-word light up, scrubbed by scroll
    let lastP = -1;
    const lightUp = () => {
      const r = p.getBoundingClientRect();
      const vh = window.innerHeight;
      const prog = reduced ? 1 : clamp((vh * 0.82 - r.top) / (r.height + vh * 0.38));
      const q = Math.round(prog * 500) / 500;
      if (q === lastP) return;
      lastP = q;
      const n = words.length;
      words.forEach((w, i) => {
        const k = clamp(q * (n + 3) - i); // each word fades in over ~1 word of progress
        w.style.setProperty("--k", k.toFixed(3));
      });
    };

    const onScroll = () => lightUp();
    lightUp();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="st" ref={wrap} aria-label="Statement">
      <p className="st-text" ref={block}>
        {WORDS.map((w, i) => (
          <span className={`st-w ${ACCENT.has(w) ? "acc" : ""}`} key={i}>
            {w}{" "}
          </span>
        ))}
      </p>

    </section>
  );
}
