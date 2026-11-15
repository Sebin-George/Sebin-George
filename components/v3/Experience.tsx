"use client";

import { useEffect, useRef, useState } from "react";
import { JOBS } from "@/lib/data";

type Pt = { x: number; y: number };

// Career timeline: a glowing line zigzags between the left and right milestones and draws itself as you scroll.
// Each milestone lights up when the line reaches it. (Technique carried over from the earlier portfolio's Experience section.)
const ENTRIES = [...JOBS].reverse(); // oldest first, ends on "Present"

const yearOf = (when: string) => when.match(/\d{4}/)?.[0] ?? "";

export default function Experience() {
  const wrap = useRef<HTMLDivElement>(null);
  const base = useRef<SVGPathElement>(null);
  const halo = useRef<SVGPathElement>(null);
  const glow = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<Pt[]>([]);
  const [on, setOn] = useState<boolean[]>(() => ENTRIES.map(() => false));

  useEffect(() => {
    const w = wrap.current;
    const bp = base.current;
    const gp = glow.current;
    const hp = halo.current;
    if (!w || !bp || !gp || !hp) return;

    const reduced = false;
    const entries = Array.from(w.querySelectorAll<HTMLElement>("[data-xp]"));
    let total = 1000;
    let fracs: number[] = ENTRIES.map((_, i) => (i + 1) / ENTRIES.length);
    let last: boolean[] = ENTRIES.map(() => false);
    let raf = 0;

    const measure = () => {
      const box = w.getBoundingClientRect();
      const pts: Pt[] = entries.map((en) => {
        const a = en.querySelector<HTMLElement>("[data-anchor]");
        if (!a) return { x: box.width / 2, y: 0 };
        const r = a.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      setNodes(pts);
      const narrow = window.matchMedia("(max-width: 800px)").matches;
      const all: Pt[] = [{ x: narrow ? pts[0]?.x ?? 14 : box.width / 2, y: 0 }, ...pts];
      const d = all.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
      bp.setAttribute("d", d);
      gp.setAttribute("d", d);
      hp.setAttribute("d", d);
      let len = 0;
      const cum = [0];
      for (let i = 1; i < all.length; i++) {
        len += Math.hypot(all[i].x - all[i - 1].x, all[i].y - all[i - 1].y);
        cum.push(len);
      }
      total = len || 1000;
      fracs = cum.slice(1).map((c) => (len ? c / len : 0));
      gp.style.strokeDasharray = String(total);
      hp.style.strokeDasharray = String(total);
      update();
    };

    const update = () => {
      const vh = window.innerHeight;
      const r = w.getBoundingClientRect();
      const span = Math.max(1, r.height - vh * 0.06);
      const p = reduced ? 1 : Math.min(1, Math.max(0, (vh * 0.72 - r.top) / span));
      gp.style.strokeDashoffset = String((1 - p) * total);
      hp.style.strokeDashoffset = String((1 - p) * total);
      const next = fracs.map((f) => p >= f - 0.02);
      if (next.some((v, i) => v !== last[i])) {
        last = next;
        setOn(next);
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => measure());
    ro.observe(w);
    (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="xp" id="experience" aria-label="Career record and experience timeline">
      <div className="xp-inner">
        <header className="xp-head" data-reveal>
          <p className="eyebrow">( Experience )</p>
          <h2>
            Two years of shipping <span className="serif accent">design</span>.
          </h2>
        </header>

        <div className="xp-meta" data-reveal>
          <span>
            <b>Career record</b> <i /> {yearOf(ENTRIES[0].when)} — Present
          </span>
          <span>{String(ENTRIES.length).padStart(2, "0")} milestones / chronological</span>
        </div>

        <div className="xp-track" ref={wrap}>
          <svg className="xp-svg" aria-hidden="true">
            <defs>
              <filter id="xp-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b2" />
                <feMerge>
                  <feMergeNode in="b2" />
                  <feMergeNode in="b1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path ref={base} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8" strokeLinecap="round" />
            <path ref={halo} fill="none" stroke="#FF4D00" strokeWidth="9" strokeLinecap="round" opacity="0.85" filter="url(#xp-glow)" style={{ strokeDashoffset: 1000 }} />
            <path ref={glow} fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" style={{ strokeDashoffset: 1000 }} />
            {nodes.map((n, i) => (
              <g key={i}>
                {on[i] && <circle cx={n.x} cy={n.y} r={11} fill="#FF4D00" opacity="0.9" filter="url(#xp-glow)" />}
                <circle cx={n.x} cy={n.y} r={on[i] ? 6 : 3} fill={on[i] ? "#ffffff" : "rgba(255,255,255,0.3)"} stroke={on[i] ? "#FF4D00" : "none"} strokeWidth="2.5" />
              </g>
            ))}
          </svg>

          <ol className="xp-list">
            {ENTRIES.map((j, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              return (
                <li key={j.org} className={`xp-entry ${side} ${on[i] ? "is-on" : ""}`} data-xp={i}>
                  <div className="xp-copy">
                    <span className="xp-when">
                      {j.now && <i className="pulse" />}
                      {j.when}
                    </span>
                    <strong className="xp-year">{yearOf(j.when)}</strong>
                    <h3>{j.org}</h3>
                    <p className="xp-role">
                      {j.role} · {j.type}
                    </p>
                    <ul className="xp-points">
                      {j.points.slice(0, 3).map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="xp-anchor" data-anchor aria-hidden="true" />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
