"use client";

import { useEffect, useRef, useState } from "react";

// Phone-only pager for the project carousel: dots follow the swipe and tapping a dot jumps to that card.
export default function StackDots({ count }: { count: number }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = ref.current?.parentElement?.querySelector<HTMLElement>(".stack");
    if (!stack) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const cards = Array.from(stack.children) as HTMLElement[];
      const mid = stack.scrollLeft + stack.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    stack.addEventListener("scroll", onScroll, { passive: true });
    // when the section is pinned (scroll slides the cards), the scroll animation reports which card is showing
    const onIndex = (e: Event) => setActive((e as CustomEvent<number>).detail);
    window.addEventListener("work:index", onIndex);
    update();
    return () => {
      cancelAnimationFrame(raf);
      stack.removeEventListener("scroll", onScroll);
      window.removeEventListener("work:index", onIndex);
    };
  }, []);

  const go = (i: number) => {
    const goto = (window as Window & { __workGoto?: (i: number) => void }).__workGoto;
    if (goto) {
      goto(i);
      return;
    }
    const stack = ref.current?.parentElement?.querySelector<HTMLElement>(".stack");
    const card = stack?.children[i] as HTMLElement | undefined;
    if (stack && card) stack.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
  };

  return (
    <div className="stack-dots" ref={ref}>
      <span className="swipe-hint">Swipe</span>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} type="button" className={i === active ? "on" : ""} aria-label={`Show project ${i + 1}`} onClick={() => go(i)} />
      ))}
      <span className="swipe-count">
        {active + 1} / {count}
      </span>
    </div>
  );
}
