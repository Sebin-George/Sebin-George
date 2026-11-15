"use client";

import { useEffect } from "react";

// Page-wide scroll effects: reveal-on-scroll, stat counters, and the stacked experience cards.
export default function Effects() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    /* ---- scroll reveal ---- */
    const sel =
      ".eyebrow,.big,.serif,.lead,.work-lead,.about-title,.portrait,.about-text,.stats>div,.step,.lists ul,.pcard,.tgroup,.info,.socials a,.form,.open-list,.swoosh,.open-art img,.follow,.exp-left .btn-small,.center .btn-small";
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
    els.forEach((el) => {
      el.classList.add("rv");
      const idx = Array.prototype.indexOf.call(el.parentNode!.children, el);
      el.style.setProperty("--d", Math.min(idx, 6) * 0.08 + "s");
    });
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            reveal.unobserve(en.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => reveal.observe(e));
    cleanups.push(() => reveal.disconnect());

    /* ---- stat counters ---- */
    const nums = Array.from(document.querySelectorAll<HTMLElement>(".stats b"));
    const counter = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          counter.unobserve(en.target);
          const el = en.target as HTMLElement;
          const txt = el.textContent || "";
          const end = parseInt(txt, 10);
          const suffix = txt.replace(/[0-9]/g, "");
          const t0 = performance.now();
          const tick = (t: number) => {
            const k = Math.min(1, (t - t0) / 1600);
            el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))) + suffix;
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.6 }
    );
    nums.forEach((n) => counter.observe(n));
    cleanups.push(() => counter.disconnect());

    /* ---- stacked experience cards (sticky scroll) ----
       Every card keeps a fanned resting spot, so all three stay visible once stacked. */
    const section = document.querySelector<HTMLElement>(".exp");
    const cards = section ? Array.from(section.querySelectorAll<HTMLElement>(".card")) : [];
    const rest = [
      { x: -64, y: -120 },
      { x: -32, y: -60 },
      { x: 0, y: 0 },
    ];
    const update = () => {
      if (!section) return;
      if (window.innerWidth <= 1100) {
        cards.forEach((c) => (c.style.transform = ""));
        return;
      }
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      const n = cards.length;
      cards.forEach((c, i) => {
        const start = i / n;
        const end = start + 0.28;
        const t = i === 0 ? 1 : Math.min(1, Math.max(0, (p - start) / (end - start)));
        const eased = 1 - Math.pow(1 - t, 3);
        const r = rest[i] || rest[rest.length - 1];
        c.style.transform = `translate(${r.x}px,${r.y + (1 - eased) * 760}px) rotate(-8deg)`;
        c.style.opacity = String(i === 0 ? 1 : Math.min(1, 0.2 + eased));
        c.style.zIndex = String(i + 1);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    cleanups.push(() => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
