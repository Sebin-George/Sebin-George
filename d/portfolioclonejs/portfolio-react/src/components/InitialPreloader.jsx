import { useEffect, useRef, useState } from "react";
import { PERSONAL_DATA } from "@/data/personal";

let o = PERSONAL_DATA.name.toUpperCase().split("");

export default function InitialPreloader() {
  let [e, n] = useState("loading"),
    [l, a] = useState(false),
    [c, h] = useState(false),
    u = useRef(null),
    d = useRef(null),
    m = useRef(null),
    p = useRef(null);
  if (
    (useEffect(() => {
      window.location.search.includes("preview=preview") && h(false);
    }, []),
    useEffect(() => {
      let e = window.matchMedia("(max-width: 639px)"),
        t = () => a(e.matches);
      return (t(), e.addEventListener("change", t), () => e.removeEventListener("change", t));
    }, []),
    useEffect(() => {
      let e = performance.now(),
        t = false,
        i = 0,
        s = 0,
        r = false,
        o = () => {
          if (t) return;
          let l = performance.now() - e,
            a = true === window.__sceneReady,
            c = 0;
          if (
            ((c = a
              ? Math.floor(100 * (1 - Math.pow(1 - Math.min(1, Math.max(0, (l - 150) / 950)), 3)))
              : Math.floor((1 - Math.pow(1 - Math.min(1, l / 2200), 2)) * 88)),
            s < c &&
              ((s = Math.min(c, s + Math.max(1, Math.ceil((c - s) * 0.2)))),
              p.current && (p.current.textContent = s < 100 ? String(s).padStart(2, "0") : "100")),
            s >= 100 && l >= 1200 && (a || l >= 6e3))
          ) {
            r ||
              ((r = true),
              p.current && (p.current.textContent = "100"),
              setTimeout(() => {
                t || n("revealing");
              }, 120));
            return;
          }
          i = requestAnimationFrame(o);
        };
      return (
        (i = requestAnimationFrame(o)),
        () => {
          ((t = true), cancelAnimationFrame(i));
        }
      );
    }, []),
    useEffect(() => {
      if ("revealing" !== e) return;
      ((window.__heroEntryStart = true),
        (window.__preloaderDone = true),
        window.dispatchEvent(new CustomEvent("hero:entry-start")),
        window.dispatchEvent(new CustomEvent("preloader:done")));
      let t = "cubic-bezier(0.16, 1, 0.3, 1)";
      (u.current &&
        u.current.animate(
          [
            {
              opacity: 1,
            },
            {
              opacity: 0,
            },
          ],
          {
            duration: 800,
            easing: t,
            fill: "forwards",
          },
        ),
        m.current &&
          m.current.animate(
            [
              {
                opacity: 1,
                transform: "scale(1)",
              },
              {
                opacity: 0,
                transform: "scale(0.92)",
              },
            ],
            {
              duration: 550,
              easing: t,
              fill: "forwards",
            },
          ),
        d.current
          ? (d.current.animate(
              [
                {
                  transform: `scale(${l ? 1.55 : 1.85})`,
                },
                {
                  transform: "scale(1.0)",
                },
              ],
              {
                duration: 850,
                easing: t,
                fill: "forwards",
              },
            ).onfinish = () => {
              ((window.__preloaderSettled = true),
                window.dispatchEvent(new CustomEvent("preloader:settled")),
                n("settled"));
            })
          : ((window.__preloaderSettled = true),
            window.dispatchEvent(new CustomEvent("preloader:settled")),
            n("settled")));
    }, [e, l]),
    "settled" === e)
  )
    return null;
  let f = l ? 1.55 : 1.85;
  return (
    <div
      aria-label="Loading portfolio"
      aria-busy={"loading" === e}
      aria-hidden={"loading" !== e}
      className="fixed inset-0 z-[10000] select-none pointer-events-none overflow-hidden"
    >
      <div
        ref={u}
        style={{
          pointerEvents: "loading" === e ? "auto" : "none",
          willChange: "opacity",
        }}
        className="absolute inset-0 bg-[#000000]"
      />
      <div
        ref={m}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <div className="flex items-baseline font-mono text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white tabular-nums">
          <span ref={p} className="">
            00
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-mono text-white/40 ml-1.5 font-normal">
            %
          </span>
        </div>
      </div>
      <div
        className={
          "" +
          ((c
            ? "absolute right-6 sm:right-8 md:right-10 lg:right-12 bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 flex flex-col items-end text-right"
            : "absolute right-4 sm:right-6 md:right-[100px] lg:right-[124px] xl:right-[148px] bottom-12 sm:bottom-14 md:bottom-20 lg:bottom-24 flex flex-col items-end text-right") ||
            "")
        }
      >
        <div
          ref={d}
          style={{
            transformOrigin: "100% 100%",
            willChange: "transform",
            transform: `scale(${f})`,
          }}
          className="transform-gpu"
        >
          <div className="flex items-baseline justify-end whitespace-nowrap font-black tracking-[-0.06em] md:tracking-[-0.05em] text-[clamp(3.0rem,12vw,5.0rem)] md:text-[clamp(3.4rem,6.7vw,6.4rem)] leading-[0.88] uppercase select-none">
            {o.map((e, i) => (
              <span
                key={`${e}-${i}`}
                style={{
                  contain: "paint",
                }}
                className="inline-block overflow-hidden py-1"
              >
                <span
                  style={{
                    animation: `preloader-letter-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + 0.08 * i}s both`,
                    willChange: "transform, opacity",
                  }}
                  className="inline-block text-white"
                >
                  {e}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>
        {
          "@keyframes preloader-letter-rise{0%{opacity:0;transform:translateY(115%)}to{opacity:1;transform:translateY(0%)}}"
        }
      </style>
    </div>
  );
}
