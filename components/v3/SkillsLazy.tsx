"use client";

import dynamic from "next/dynamic";

// GSAP + ScrollTrigger are only needed for the Skills sequence, so that chunk loads after the first screen is up.
// The placeholder has the same height as the pinned stage, so nothing jumps when the real section arrives.
const Skills = dynamic(() => import("@/components/v3/Skills"), {
  ssr: false,
  loading: () => (
    <section className="skills" id="skills" aria-label="Skills and tools">
      <div className="cap-stage" />
    </section>
  ),
});

export default function SkillsLazy() {
  return <Skills />;
}
