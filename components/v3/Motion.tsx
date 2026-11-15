"use client";

import { useEffect } from "react";

// Page-wide motion: reveal on scroll, count-up numbers, scroll progress bar, card tilt, stacked-card easing,
// and a live local clock.
// All scroll-driven work shares ONE requestAnimationFrame-throttled handler: layout is read first, then written,
// values are cached, and anything off-screen is skipped.
export default function Motion() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const reduced = false;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));

    /* reveal on scroll: plays EVERY time an element comes into view (it resets once it has fully left the screen) */
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
    } else {
      const enter = new IntersectionObserver(
        (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add("in")),
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      const leave = new IntersectionObserver(
        (entries) => entries.forEach((en) => !en.isIntersecting && en.target.classList.remove("in")),
        { threshold: 0, rootMargin: "120px 0px 120px 0px" }
      );
      items.forEach((el) => {
        enter.observe(el);
        leave.observe(el);
      });
      cleanups.push(() => {
        enter.disconnect();
        leave.disconnect();
      });
    }

    /* count-up: counts again every time the numbers come into view */
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const runs = new Map<HTMLElement, number>();
    const cin = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          const el = en.target as HTMLElement;
          const end = Number(el.dataset.count || 0);
          cancelAnimationFrame(runs.get(el) || 0);
          if (!en.isIntersecting) {
            el.textContent = "0";
            return;
          }
          const t0 = performance.now();
          const tick = (t: number) => {
            const k = Math.min(1, (t - t0) / 1400);
            el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))));
            if (k < 1) runs.set(el, requestAnimationFrame(tick));
          };
          runs.set(el, requestAnimationFrame(tick));
        }),
      { threshold: 0.6 }
    );
    counters.forEach((el) => cin.observe(el));
    cleanups.push(() => {
      cin.disconnect();
      runs.forEach((id) => cancelAnimationFrame(id));
    });

    /* hero entrance: restarts every time you scroll back up to the top */
    const hero = document.querySelector<HTMLElement>(".hero");
    if (hero && "IntersectionObserver" in window) {
      const hio = new IntersectionObserver(([e]) => hero.classList.toggle("is-away", !e.isIntersecting), { threshold: 0, rootMargin: "200px 0px 200px 0px" });
      hio.observe(hero);
      cleanups.push(() => hio.disconnect());
    }

    /* tilt (pointer only) */
    if (!reduced && window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        let raf = 0;
        let ev: PointerEvent | null = null;
        const apply = () => {
          raf = 0;
          if (!ev) return;
          const r = el.getBoundingClientRect();
          const x = (ev.clientX - r.left) / r.width - 0.5;
          const y = (ev.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) scale(1.015)`;
        };
        const move = (e: PointerEvent) => {
          ev = e;
          if (!raf) raf = requestAnimationFrame(apply);
        };
        const leave = () => {
          ev = null;
          el.style.transform = "";
        };
        el.addEventListener("pointermove", move, { passive: true });
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          cancelAnimationFrame(raf);
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    /* ---------- scroll-driven things, one shared frame ---------- */
    const bar = document.getElementById("progress");
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".proj"));
    let docMax = 1;
    let sticky: number[] = [];
    let isSticky: boolean[] = [];
    const lastCard: number[] = cards.map(() => NaN);

    const measure = () => {
      docMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      isSticky = cards.map((c) => getComputedStyle(c).position === "sticky");
      sticky = cards.map((c) => parseFloat(getComputedStyle(c).top) || 0);
    };

    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;

      // ---- reads
      const gaps: number[] = [];
      if (!reduced) {
        for (let i = 0; i < cards.length - 1; i++) {
          gaps[i] = isSticky[i + 1] ? cards[i + 1].getBoundingClientRect().top - sticky[i + 1] : NaN;
        }
      }

      // ---- writes
      if (bar) bar.style.transform = `scaleX(${clamp(y / docMax)})`;

      if (!reduced) {
        for (let i = 0; i < cards.length - 1; i++) {
          const g = gaps[i];
          const p = Number.isNaN(g) ? 0 : clamp(1 - g / (vh * 0.7));
          const q = Math.round(p * 200) / 200;
          if (q === lastCard[i]) continue;
          lastCard[i] = q;
          const c = cards[i];
          if (q === 0) {
            c.style.transform = "";
            c.style.removeProperty("--dim");
          } else {
            c.style.transformOrigin = "50% 0%";
            c.style.transform = `scale(${1 - q * 0.045})`;
            c.style.setProperty("--dim", String(q * 0.42));
          }
        }
      }

    };

    let raf = 0;
    const onFrame = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      lastCard.fill(NaN);
      onFrame();
    };
    measure();
    frame();
    window.addEventListener("scroll", onFrame, { passive: true });
    window.addEventListener("resize", onResize);
    // content above can change height (images, fonts): re-measure when the document size changes
    const ro = new ResizeObserver(() => {
      const m = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (Math.abs(m - docMax) > 2) onResize();
    });
    ro.observe(document.body);
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onFrame);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    });

    /* smoothness: flag the page while it is being scrolled, and flag sections that are off screen,
       so endless decorative loops pause instead of competing with the scroll (see globals.css) */
    {
      const root = document.documentElement;
      let timer = 0;
      const onScrollFlag = () => {
        if (!root.classList.contains("is-scrolling")) root.classList.add("is-scrolling");
        window.clearTimeout(timer);
        timer = window.setTimeout(() => root.classList.remove("is-scrolling"), 160);
      };
      window.addEventListener("scroll", onScrollFlag, { passive: true });
      const zones = Array.from(document.querySelectorAll<HTMLElement>(".hero, .marquee, #work, #about, #experience, #skills, .st, #contact"));
      const vis = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle("is-off", !e.isIntersecting)), { rootMargin: "80px 0px" });
      zones.forEach((z) => vis.observe(z));
      cleanups.push(() => {
        window.clearTimeout(timer);
        window.removeEventListener("scroll", onScrollFlag);
        vis.disconnect();
        root.classList.remove("is-scrolling");
      });
    }

    /* live local clock (Kochi) */
    const clock = document.querySelector<HTMLElement>("[data-clock]");
    let timer = 0;
    if (clock) {
      const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
      const upd = () => (clock.textContent = fmt.format(new Date()));
      upd();
      timer = window.setInterval(upd, 15000);
    }

    return () => {
      cleanups.forEach((fn) => fn());
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
