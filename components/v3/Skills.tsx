"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILL_GROUPS, TOOLS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const COLORS: Record<string, string> = {
  figma: "#f24e1e",
  ps: "#31a8ff",
  ai: "#ff9a00",
  xd: "#ff61f6",
  html5: "#e34f26",
  css3: "#1572b6",
  bootstrap: "#7952b3",
  js: "#f7df1e",
  jquery: "#0868ac",
};

// One pinned scroll sequence for the whole section:
//   1. "CAPABILITIES" rises letter by letter, then the tool tiles cascade up with a 3D tilt (from the earlier portfolio),
//   2. the tiles lift away,
//   3. the skill cards are dealt out of a single stack, each flipping into place, and their chips pop in one by one.
export default function Skills() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const layerA = useRef<HTMLDivElement>(null);
  const layerB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = section.current;
    const pinStage = stage.current;
    const a = layerA.current;
    const b = layerB.current;
    if (!root || !pinStage || !a || !b) return;

    const mm = gsap.matchMedia();
    const chars = () => root.querySelectorAll<HTMLElement>(".cap-char");
    const tiles = () => root.querySelectorAll<HTMLElement>(".cap-card");
    const cards = () => root.querySelectorAll<HTMLElement>(".skill");
    const chips = (el: Element) => el.querySelectorAll<HTMLElement>("li");

    // Small screens: no pinning (pinning leaves blank scroll on a phone). The letters and tiles rise in once as the section
    // scrolls into view, then the skill cards follow right underneath in normal flow.
    mm.add("(max-width: 900px)", () => {
      const from = { y: 36, opacity: 0, rotateX: -35 };
      gsap.set(chars(), from);
      gsap.set(tiles(), { y: 28, opacity: 0, scale: 0.85 });
      gsap.set(cards(), { y: 30, opacity: 0 });
      const trig = { trigger: a, start: "top 80%", end: "bottom 10%", toggleActions: "restart none restart reset" };
      gsap.to(chars(), { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, duration: 0.7, ease: "power3.out", scrollTrigger: trig });
      gsap.to(tiles(), { y: 0, opacity: 1, scale: 1, stagger: 0.04, duration: 0.55, delay: 0.25, ease: "back.out(1.6)", scrollTrigger: trig });
      cards().forEach((card) => {
        gsap.to(card, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 92%", end: "bottom 5%", toggleActions: "restart none restart reset" } });
        gsap.fromTo(chips(card), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.02, duration: 0.3, ease: "back.out(2)", scrollTrigger: { trigger: card, start: "top 90%", end: "bottom 5%", toggleActions: "restart none restart reset" } });
      });
    });

    // Desktop: the full sequence.
    //   A) entrance: "CAPABILITIES" + the tiles rise while the section scrolls INTO view (finishes exactly when it pins),
    //   B) pinned: short hold -> tiles lift away -> the skill cards are dealt out and their chips pop in -> short hold.
    mm.add("(min-width: 901px)", () => {
      const from = { y: "65vh", opacity: 0, rotateX: -35 };
      gsap.set(chars(), from);
      gsap.set(tiles(), from);
      gsap.set(b, { autoAlpha: 0 });
      gsap.set(a, { autoAlpha: 1 });

      // A) entrance (no pin, so there is no dead scroll before anything happens)
      const intro = gsap.timeline({
        scrollTrigger: { trigger: pinStage, start: "top 94%", end: "top top", scrub: 0.8, invalidateOnRefresh: true },
      });
      intro
        .to(chars(), { y: "0vh", opacity: 1, rotateX: 0, stagger: { each: 0.018, ease: "power2.out" }, duration: 0.41, ease: "power3.out" }, 0)
        .to(tiles(), { y: "0vh", opacity: 1, rotateX: 0, stagger: { each: 0.024, ease: "power2.out" }, duration: 0.55, ease: "power3.out" }, 0.12);

      // B) pinned sequence
      const tl = gsap.timeline({
        scrollTrigger: { trigger: pinStage, start: "top top", end: "+=280%", pin: true, scrub: 0.4, refreshPriority: 5, invalidateOnRefresh: true },
      });
      const shown = { y: "0vh", opacity: 1, rotateX: 0, scale: 1 };

      tl.to({}, { duration: 0.25 }); // short hold on the finished tiles

      // tiles + headline lift away (explicit start values, so it is correct however the page was scrolled to get here)
      tl.fromTo(tiles(), shown, { y: "-14vh", scale: 0.8, opacity: 0, rotateX: 30, stagger: { each: 0.02, from: "center" }, duration: 0.45, ease: "power2.in", immediateRender: false })
        .fromTo(chars(), shown, { y: "-18vh", opacity: 0, rotateX: 40, stagger: { each: 0.012, from: "center" }, duration: 0.4, ease: "power2.in", immediateRender: false }, "<")
        .fromTo(root.querySelector(".cap-eyebrow"), { opacity: 1 }, { opacity: 0, duration: 0.3, immediateRender: false }, "<");

      // the toolkit stage only appears once everything above has gone (no overlap)
      const liftEnd = tl.duration(); // end of the longest lift tween
      tl.set(a, { autoAlpha: 0 }, liftEnd);
      tl.set(b, { autoAlpha: 1 }, liftEnd + 0.02)
        .fromTo(root.querySelector(".cap-b-head"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, liftEnd + 0.02)
        .addLabel("deal", liftEnd + 0.17)
        .fromTo(
          cards(),
          {
            x: (_i: number, el: Element) => {
              const g = (el.parentElement as HTMLElement).getBoundingClientRect();
              const r = (el as HTMLElement).getBoundingClientRect();
              return g.left + g.width / 2 - (r.left + r.width / 2);
            },
            y: (_i: number, el: Element) => {
              const g = (el.parentElement as HTMLElement).getBoundingClientRect();
              const r = (el as HTMLElement).getBoundingClientRect();
              return g.top + g.height / 2 - (r.top + r.height / 2);
            },
            rotation: (i: number) => (i - 3) * 7,
            rotateY: 110,
            scale: 0.55,
            opacity: 0,
            transformPerspective: 1400,
          },
          { x: 0, y: 0, rotation: 0, rotateY: 0, scale: 1, opacity: 1, stagger: 0.14, duration: 0.7, ease: "back.out(1.25)" },
          "deal"
        );

      // chips pop in card by card, right behind the deal
      cards().forEach((card, i) => {
        tl.fromTo(chips(card), { opacity: 0, y: 14, scale: 0.7 }, { opacity: 1, y: 0, scale: 1, stagger: 0.022, duration: 0.28, ease: "back.out(2)" }, `deal+=${0.42 + i * 0.14}`);
      });
      tl.to({}, { duration: 0.3 }); // hold so the finished grid can be read
    });

    // re-measure once fonts / images / lazy chunks have settled, so the trigger points are exact
    const settle = () => ScrollTrigger.refresh();
    window.addEventListener("load", settle);
    (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready.then(settle);
    const t = window.setTimeout(settle, 700);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", settle);
      mm.revert();
    };
  }, []);

  // pointer-follow spotlight on the cards
  const spot = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="skills" id="skills" ref={section} aria-label="Skills and tools">
      <div className="cap-stage" ref={stage}>
        <div className="cap-a" ref={layerA}>
          <p className="eyebrow cap-eyebrow">( Skills &amp; tools )</p>
          <h2 className="cap-title" aria-label="Capabilities">
            {"CAPABILITIES".split("").map((ch, i) => (
              <span className="cap-char" key={i} aria-hidden="true">
                {ch}
              </span>
            ))}
          </h2>

          <ul className="cap-grid">
            {TOOLS.map((t) => (
              <li className="cap-card" key={t.logo} style={{ ["--c" as string]: COLORS[t.logo] ?? "#b9a6ff" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/assets/logos/${t.logo}.png`} alt="" width={44} height={44} draggable={false} />
                <span>{t.name}</span>
              </li>
            ))}
            <li className="cap-card cap-more" style={{ ["--c" as string]: "#FF4D00" }}>
              <b>{">_"}</b>
              <span>&amp; more</span>
            </li>
          </ul>
        </div>

        <div className="cap-b" ref={layerB}>
          <div className="cap-b-head">
            <p className="eyebrow">( Full toolkit )</p>
            <h2>
              A toolkit that covers research to <span className="serif accent">handoff</span>.
            </h2>
          </div>
          <div className="skill-grid">
            {SKILL_GROUPS.map((g, i) => (
              <div className="skill" key={g.title} onPointerMove={spot}>
                <h3>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {g.title}
                </h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
