import Link from "@/components/Link";
import SceneBackground from "@/components/SceneBackground";
import Image from "@/components/Image";
import { createLucideIcon } from "@/lib/lucide";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { useDialKit } from "@/lib/dialkit";
import { LazyMotion, animate, domAnimation, m as mLib, motion, useMotionValue } from "motion/react";
import { projects } from "@/data/projects";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { PERSONAL_DATA } from "@/data/personal";

function usePrefersReducedMotion() {
  let [e, t] = useState(false);
  return (
    useEffect(() => {
      let e = window.matchMedia("(prefers-reduced-motion: reduce)");
      t(e.matches);
      let r = () => t(e.matches);
      return (e.addEventListener("change", r), () => e.removeEventListener("change", r));
    }, []),
    e
  );
}
let u = {
    startYVh: 20,
    rotateX: -25,
    duration: 0.55,
    staggerEach: 0.024,
    scrub: 1,
    pinEndPercent: 120,
    holdDuration: 0.25,
  },
  p = {
    startOpacity: 0.18,
    wordStagger: 0.05,
    scrubLag: 0.85,
    startTrigger: 78,
    endTrigger: 48,
  },
  m = {
    startYVh: 55,
    rotateX: -35,
    duration: 0.55,
    staggerEach: 0.024,
    scrub: 1,
    pinEndPercent: 140,
    holdDuration: 0.25,
  },
  x = {
    driftDistance: 48,
    duration: 0.75,
    staggerMultiplier: 1,
  },
  g = {
    detachZonePx: 260,
    flipStartY: 280,
    flipEndY: 50,
  };
let f = {
    transformOrigin: "center",
  },
  b = createContext({
    ...x,
    replayKey: 0,
    isStarted: false,
  });
function HeroEntry({ children: e, className: a }) {
  var s;
  let n,
    [i, l] = useState(0),
    [o, c] = useState(false),
    u =
      ((s = useCallback(() => {
        l((e) => e + 1);
      }, [])),
      {
        driftDistance:
          (n = useDialKit(
            "Hero: Entry Motion",
            {
              driftDistance: [x.driftDistance, 16, 200, 4],
              duration: [x.duration, 0.2, 2, 0.05],
              staggerMultiplier: [x.staggerMultiplier, 0.2, 2.5, 0.05],
              replay: {
                type: "action",
              },
            },
            {
              id: "hero-motion-v2",
              persist: true,
              defaultCollapsed: true,
              onAction: (e) => {
                "replay" === e && s && s();
              },
            },
          )).driftDistance ?? x.driftDistance,
        duration: n.duration ?? x.duration,
        staggerMultiplier: n.staggerMultiplier ?? x.staggerMultiplier,
      });
  return (
    useEffect(() => {
      if (window.__preloaderDone) return void c(true);
      let e = () => {
        c(true);
      };
      window.addEventListener("preloader:done", e, {
        once: true,
      });
      let t = setTimeout(() => {
        c(true);
      }, 2200);
      return () => {
        (window.removeEventListener("preloader:done", e), clearTimeout(t));
      };
    }, []),
    (
      <b.Provider
        value={{
          ...u,
          replayKey: i,
          isStarted: o,
        }}
      >
        <div key={i} className={a}>
          {e}
        </div>
      </b.Provider>
    )
  );
}
function HeroReveal({ children: e, className: a, drift: s = "center", delay: n = 0 }) {
  let i = usePrefersReducedMotion(),
    d = useContext(b),
    u = "left" === s ? -d.driftDistance : "right" === s ? d.driftDistance : 0,
    p = "up" === s ? 40 : 20 * ("center" === s);
  return (
    <mLib.div
      key={d.replayKey}
      className={cn(a, "transform-gpu")}
      initial={
        i
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              x: u,
              y: p,
            }
      }
      animate={
        i || d.isStarted
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              x: u,
              y: p,
            }
      }
      transition={{
        duration: d.duration,
        delay: i ? 0 : n * d.staggerMultiplier,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={f}
    >
      {e}
    </mLib.div>
  );
}
function HeroChips({ baseDelay: e = 0.18 } = {}) {
  let a = usePrefersReducedMotion(),
    s = useContext(b);
  return (
    <div className="flex flex-wrap gap-2">
      {PERSONAL_DATA.hero.chips.map((r, n) => (
        <mLib.div
          key={r.label}
          initial={
            a
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {
                  opacity: 0,
                  x: -36,
                }
          }
          animate={
            a || s.isStarted
              ? {
                  opacity: 1,
                  x: 0,
                }
              : {
                  opacity: 0,
                  x: -36,
                }
          }
          transition={{
            duration: 0.72 * s.duration,
            delay: a ? 0 : (e + 0.08 * n) * s.staggerMultiplier,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link
            href={r.href}
            className={cn(
              "inline-flex items-center rounded-full border border-white bg-transparent",
              "px-3.5 py-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-white",
              "transition-[border-color,background-color,transform,box-shadow,color] duration-200",
              "hover:bg-white/10 hover:text-white",
              "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            )}
          >
            {r.label}
          </Link>
        </mLib.div>
      ))}
    </div>
  );
}
function Hero() {
  let [e, a] = useState(() => !!window.__preloaderSettled);
  return (
    useEffect(() => {
      if (window.__preloaderSettled) return void a(true);
      let e = () => {
        a(true);
      };
      window.addEventListener("preloader:settled", e, {
        once: true,
      });
      let t = setTimeout(() => {
        a(true);
      }, 4500);
      return () => {
        (window.removeEventListener("preloader:settled", e), clearTimeout(t));
      };
    }, []),
    (
      <LazyMotion features={domAnimation} strict={true}>
        <section
          id="hero"
          className="relative isolate w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-transparent contain-layout pt-16 pb-8 sm:pt-20 sm:pb-10 md:pt-16 md:pb-8 lg:pt-20 lg:pb-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full sm:w-[65vw] md:w-[48vw] max-w-2xl bg-gradient-to-r from-background/70 via-background/25 to-transparent"
          />
          <div className="relative z-20 h-full min-h-0 w-full pl-4 pr-4 sm:pl-6 sm:pr-6 md:h-auto md:pl-10 md:pr-[100px] lg:pl-14 lg:pr-[124px] xl:pl-20 xl:pr-[148px]">
            <HeroEntry className="md:hidden flex flex-col justify-between min-h-[calc(100svh-6rem)] sm:min-h-[calc(100svh-7.5rem)]">
              <div className="flex flex-col items-start gap-2.5 sm:gap-3">
                <HeroReveal drift="left" delay={0.24}>
                  <h1 className="hero-text-glow text-white font-black uppercase leading-[0.92] tracking-[-0.04em] text-[clamp(2.2rem,8.5vw,3.8rem)] text-left whitespace-pre-line">
                    {PERSONAL_DATA.hero.headline}
                  </h1>
                </HeroReveal>
                <HeroReveal drift="left" delay={0.38}>
                  <HeroChips baseDelay={0.38} />
                </HeroReveal>
              </div>
              <div className="pointer-events-none min-h-[140px] flex-1" aria-hidden="true" />
              <div className="flex flex-col items-end gap-2 text-right">
                <HeroReveal drift="right" delay={0.85}>
                  <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/80">
                    {PERSONAL_DATA.currentRole.toUpperCase()}
                  </div>
                </HeroReveal>
                <div
                  className="hero-text-glow text-right text-white font-black uppercase leading-[0.88] tracking-[-0.06em] text-[clamp(3.0rem,12vw,5.0rem)] transition-opacity duration-200"
                  style={{
                    opacity: +!!e,
                  }}
                >
                  {PERSONAL_DATA.name}
                </div>
              </div>
            </HeroEntry>
            <HeroEntry className="hidden md:flex flex-col justify-between min-h-[calc(100svh-7.5rem)] lg:min-h-[calc(100svh-8.5rem)]">
              <div className="flex flex-col items-start">
                <HeroReveal className="md:text-left" drift="left" delay={0.24}>
                  <h1 className="hero-text-glow text-white font-black uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(2.5rem,5.5vw,5.2rem)] max-w-2xl text-left whitespace-pre-line">
                    {PERSONAL_DATA.hero.headline}
                  </h1>
                </HeroReveal>
                <HeroReveal className="mt-3.5" drift="left" delay={0.38}>
                  <HeroChips baseDelay={0.38} />
                </HeroReveal>
              </div>
              <div className="flex w-full justify-end">
                <div className="flex flex-col items-end">
                  <HeroReveal drift="right" delay={0.85}>
                    <div className="mb-4 max-w-104 text-right">
                      <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/80">
                        {PERSONAL_DATA.currentRole.toUpperCase()}
                      </div>
                    </div>
                  </HeroReveal>
                  <div
                    className="hero-text-glow text-white font-black uppercase leading-[0.88] tracking-[-0.05em] text-[clamp(3.4rem,6.7vw,6.4rem)] text-right transition-opacity duration-200"
                    style={{
                      opacity: +!!e,
                    }}
                  >
                    {PERSONAL_DATA.name}
                  </div>
                </div>
              </div>
            </HeroEntry>
          </div>
          <div className="pointer-events-none hidden" aria-hidden="true" />
        </section>
      </LazyMotion>
    )
  );
}
let S = [
  {
    lineClassName: "py-0.5 sm:py-1",
    words: [{ text: "CRAFTING", className: "text-foreground" }],
  },
  {
    lineClassName: "py-0.5 sm:py-1",
    words: [
      { text: "RESPONSIVE", className: "text-foreground mr-3 sm:mr-4 md:mr-6" },
      { text: "MERN", className: "text-foreground" },
    ],
  },
  {
    lineClassName: "py-0.5 sm:py-1",
    words: [{ text: "APPLICATIONS.", className: "text-foreground/45" }],
  },
];
function About() {
  var e;
  let a,
    s,
    n = useRef(null),
    i = useRef(null),
    l = useRef(null),
    o = useRef(null),
    m =
      ((e = useCallback(() => {
        n.current &&
          n.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, [])),
      {
        startYVh:
          (a = useDialKit(
            "About: Headline Scrub",
            {
              startYVh: [u.startYVh, 10, 100, 1],
              rotateX: [u.rotateX, -90, 0, 1],
              duration: [u.duration, 0.1, 2, 0.05],
              staggerEach: [u.staggerEach, 0.005, 0.1, 0.002],
              scrub: [u.scrub, 0, 4, 0.1],
              pinEndPercent: [u.pinEndPercent, 50, 300, 10],
              holdDuration: [u.holdDuration, 0, 1, 0.05],
              replay: {
                type: "action",
              },
            },
            {
              id: "about-headline",
              persist: true,
              defaultCollapsed: true,
              onAction: (t) => {
                "replay" === t && e && e();
              },
            },
          )).startYVh ?? u.startYVh,
        rotateX: a.rotateX ?? u.rotateX,
        duration: a.duration ?? u.duration,
        staggerEach: a.staggerEach ?? u.staggerEach,
        scrub: a.scrub ?? u.scrub,
        pinEndPercent: a.pinEndPercent ?? u.pinEndPercent,
        holdDuration: a.holdDuration ?? u.holdDuration,
      }),
    x = {
      startOpacity:
        (s = useDialKit(
          "About: Bio Scrub",
          {
            startOpacity: [p.startOpacity, 0, 0.5, 0.02],
            wordStagger: [p.wordStagger, 0.01, 0.2, 0.01],
            scrubLag: [p.scrubLag, 0, 3, 0.05],
            startTrigger: [p.startTrigger, 50, 95, 1],
            endTrigger: [p.endTrigger, 20, 80, 1],
          },
          {
            id: "about-bio",
            persist: true,
            defaultCollapsed: true,
          },
        )).startOpacity ?? p.startOpacity,
      wordStagger: s.wordStagger ?? p.wordStagger,
      scrubLag: s.scrubLag ?? p.scrubLag,
      startTrigger: s.startTrigger ?? p.startTrigger,
      endTrigger: s.endTrigger ?? p.endTrigger,
    };
  return (
    useEffect(() => {
      if (!n.current) return;
      let e = gsap.context(() => {
        let e = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          t = n.current?.querySelectorAll(".about-headline-letter"),
          r = n.current?.querySelectorAll(".about-scrub-word");
        if (e) {
          (t &&
            gsap.set(t, {
              y: 0,
              opacity: 1,
              rotateX: 0,
            }),
            r &&
              gsap.set(r, {
                opacity: 1,
              }));
          return;
        }
        if (t && t.length > 0 && i.current) {
          gsap.set(t, {
            y: `${m.startYVh}vh`,
            opacity: 0,
            rotateX: m.rotateX,
          });
          let e = gsap.timeline({
            scrollTrigger: {
              trigger: i.current,
              start: "top top",
              end: `+=${m.pinEndPercent}%`,
              pin: true,
              scrub: m.scrub,
              refreshPriority: 10,
              invalidateOnRefresh: true,
            },
          });
          (e.to(
            t,
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              stagger: {
                each: m.staggerEach,
                from: "start",
                ease: "power2.out",
              },
              duration: m.duration,
              ease: "power3.out",
            },
            0,
          ),
            e.to(
              {},
              {
                duration: m.holdDuration,
              },
            ));
        }
        r &&
          r.length > 0 &&
          l.current &&
          gsap.fromTo(
            r,
            {
              opacity: x.startOpacity,
            },
            {
              opacity: 1,
              stagger: x.wordStagger,
              ease: "none",
              scrollTrigger: {
                trigger: l.current,
                start: `top ${x.startTrigger}%`,
                end: `bottom ${x.endTrigger}%`,
                scrub: x.scrubLag,
              },
            },
          );
      }, n);
      return (ScrollTrigger.refresh(), () => e.revert());
    }, [
      m.startYVh,
      m.rotateX,
      m.duration,
      m.staggerEach,
      m.scrub,
      m.pinEndPercent,
      m.holdDuration,
      x.startOpacity,
      x.wordStagger,
      x.scrubLag,
      x.startTrigger,
      x.endTrigger,
    ]),
    (
      <section
        ref={n}
        id="about"
        className="about-section relative bg-transparent text-foreground overflow-hidden scroll-mt-20 z-10"
        aria-label={`About ${PERSONAL_DATA.name} - ${PERSONAL_DATA.role}`}
      >
        <div
          ref={i}
          className="about-pinned-stage relative w-full min-h-[88svh] flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-44 max-w-[1920px] mx-auto overflow-hidden py-4 sm:py-8 select-none"
        >
          <div className="w-full flex flex-col items-center justify-center">
            <h2
              ref={o}
              style={{
                perspective: "1000px",
              }}
              className="text-[clamp(2.2rem,8.5vw,3.8rem)] md:text-[clamp(2.5rem,5.5vw,5.2rem)] font-black uppercase tracking-[-0.04em] leading-[0.92] sm:leading-[0.9] text-foreground text-center select-none w-full max-w-[95vw] sm:max-w-4xl md:max-w-5xl mx-auto"
            >
              {S.map((e, r) => (
                <div
                  key={r}
                  className={cn("flex flex-wrap items-center justify-center text-center", e.lineClassName)}
                >
                  {e.words.map((e, r) => (
                    <span key={r} className={cn("inline-block whitespace-nowrap", e.className)}>
                      {e.text.split("").map((e, r) => (
                        <span key={r} className="about-headline-letter inline-block will-change-transform">
                          {e}
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              ))}
            </h2>
          </div>
        </div>
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-44 max-w-[1920px] mx-auto pt-16 sm:pt-24 pb-24 sm:pb-32 lg:pb-40">
          <div className="max-w-4xl mx-auto text-center">
            <p
              ref={l}
              className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug sm:leading-snug md:leading-snug tracking-tight text-foreground font-sans select-text"
            >
              {"I am Saviyo George — a full stack developer specializing in the MERN stack, based in Idukki, Kerala. I build responsive and scalable web applications, integrating front-end and back-end technologies. Currently at D3Innovatives, I develop enterprise ERP and POS applications with React.js, TypeScript and Tailwind CSS, including barcode generation, receipt templates and WebSocket-based thermal printing. Backed by a Bachelor of Computer Applications and hands-on PHP and MERN internships, my technical skills, paired with a commitment to continuous learning, let me deliver effective solutions."
                .split(" ")
                .map((e, r) => (
                  <span
                    key={`${e}-${r}`}
                    className="about-scrub-word inline-block mr-[0.28em] will-change-opacity"
                  >
                    {e.includes(PERSONAL_DATA.name) ? (
                      <strong className="font-black text-foreground underline decoration-foreground/35 underline-offset-8">
                        {e}
                      </strong>
                    ) : e.includes(PERSONAL_DATA.company) ? (
                      <strong className="font-bold text-foreground">{e}</strong>
                    ) : (
                      e
                    )}
                  </span>
                ))}
            </p>
          </div>
        </div>
      </section>
    )
  );
}
gsap.registerPlugin(ScrollTrigger);
let A = [
  {
    id: "react",
    name: "React",
    svgPath: "/svg/react.svg",
    color: "#58c4dc",
    size: 38,
    mobileSize: 28,
  },
  {
    id: "nextjs",
    name: "Next.js",
    svgPath: "/svg/nextjs.svg",
    color: "#ffffff",
    size: 38,
    mobileSize: 28,
  },
  {
    id: "typescript",
    name: "TypeScript",
    svgPath: "/svg/typescript.svg",
    color: "#3178c6",
    size: 36,
    mobileSize: 26,
  },
  {
    id: "javascript",
    name: "JavaScript",
    svgPath: "/svg/javascript.svg",
    color: "#f7df1e",
    size: 36,
    mobileSize: 26,
  },
  {
    id: "redux",
    name: "Redux",
    svgPath: "/svg/redux.svg",
    color: "#764abc",
    size: 36,
    mobileSize: 26,
  },
  {
    id: "tanstack",
    name: "React Query",
    svgPath: "/svg/tanstack.svg",
    color: "#ff4154",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    svgPath: "/svg/tailwindcss.svg",
    color: "#06b6d4",
    size: 40,
    mobileSize: 30,
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    svgPath: "/svg/bootstrap.svg",
    color: "#7952b3",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "nodejs",
    name: "Node.js",
    svgPath: "/svg/nodejs.svg",
    color: "#68a063",
    size: 36,
    mobileSize: 26,
  },
  {
    id: "express",
    name: "Express.js",
    svgPath: "/svg/express.svg",
    color: "#ffffff",
    size: 36,
    mobileSize: 26,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    svgPath: "/svg/mongodb.svg",
    color: "#47a248",
    size: 36,
    mobileSize: 26,
  },
  {
    id: "mysql",
    name: "MySQL",
    svgPath: "/svg/mysql.svg",
    color: "#00758f",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "php",
    name: "PHP",
    svgPath: "/svg/php.svg",
    color: "#777bb4",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "websocket",
    name: "WebSocket",
    svgPath: "/svg/websocket.svg",
    color: "#0ea5e9",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "socketio",
    name: "Socket.IO",
    svgPath: "/svg/socketio.svg",
    color: "#ffffff",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "git",
    name: "Git",
    svgPath: "/svg/git.svg",
    color: "#f05032",
    size: 36,
    mobileSize: 26,
  },
  {
    id: "github",
    name: "GitHub",
    svgPath: "/svg/github.svg",
    color: "#ffffff",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "postman",
    name: "Postman",
    svgPath: "/svg/postman.svg",
    color: "#ff6c37",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "vite",
    name: "Vite",
    svgPath: "/svg/vite.svg",
    color: "#646cff",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "figma",
    name: "Figma",
    svgPath: "/svg/figma.svg",
    color: "#f24e1e",
    size: 34,
    mobileSize: 24,
  },
  {
    id: "html5",
    name: "HTML5",
    svgPath: "/svg/html5.svg",
    color: "#e34f26",
    size: 36,
    mobileSize: 26,
  },
  {
    id: "css3",
    name: "CSS3",
    svgPath: "/svg/css3.svg",
    color: "#1572b6",
    size: 36,
    mobileSize: 26,
  },
];
function SkillItem({ config: e, isMobile: r }) {
  let { name: a, svgPath: s, size: n, mobileSize: i, color: l } = e,
    o = r ? i : n;
  return (
    <div className="skill-card-item will-change-transform select-none w-full origin-bottom">
      <div
        style={{
          "--skill-color": l,
        }}
        className="skill-glass-card relative aspect-square w-full flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl group cursor-default"
      >
        <div className="relative z-10 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12">
          <Image
            src={s}
            alt={a}
            width={o}
            height={o}
            unoptimized={true}
            className="max-h-full max-w-full object-contain pointer-events-none transition-transform duration-200 ease-out group-hover:scale-115 group-hover:drop-shadow-md"
            draggable={false}
          />
        </div>
        <span className="relative z-10 mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-mono font-medium tracking-tight text-white/75 group-hover:text-white transition-colors duration-200 text-center truncate max-w-full">
          {a}
        </span>
      </div>
    </div>
  );
}
function Skills() {
  var e;
  let a,
    s = useRef(null),
    n = useRef(null),
    [i, l] = useState(false),
    o = useRef(null),
    c =
      ((e = useCallback(() => {
        if (!s.current) return;
        let e = o.current;
        if (!e) return;
        let t = window;
        t.lenis && s.current
          ? t.lenis.scrollTo(s.current, {
              duration: 1,
            })
          : s.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        let r = s.current.querySelectorAll(".skills-headline-char"),
          a = s.current.querySelectorAll(".skill-card-item"),
          n = `${Math.max(e.startYVh, 65)}vh`;
        (r &&
          r.length > 0 &&
          (gsap.killTweensOf(r),
          gsap.fromTo(
            r,
            {
              y: n,
              opacity: 0,
              rotateX: e.rotateX,
            },
            {
              y: "0vh",
              opacity: 1,
              rotateX: 0,
              stagger: {
                each: 0.02,
                from: "start",
                ease: "power2.out",
              },
              duration: 0.8 * e.duration,
              ease: "power3.out",
              overwrite: "auto",
            },
          )),
          a &&
            a.length > 0 &&
            (gsap.killTweensOf(a),
            gsap.fromTo(
              a,
              {
                y: n,
                opacity: 0,
                rotateX: e.rotateX,
              },
              {
                y: "0vh",
                opacity: 1,
                rotateX: 0,
                stagger: {
                  each: e.staggerEach,
                  from: "start",
                  ease: "power2.out",
                },
                duration: e.duration,
                ease: "power3.out",
                overwrite: "auto",
              },
            )));
      }, [])),
      {
        startYVh:
          (a = useDialKit(
            "Skills: Cascade Scrub",
            {
              startYVh: [m.startYVh, 10, 100, 1],
              rotateX: [m.rotateX, -90, 0, 1],
              duration: [m.duration, 0.1, 2.5, 0.05],
              staggerEach: [m.staggerEach, 0.005, 0.1, 0.002],
              scrub: [m.scrub, 0, 4, 0.1],
              pinEndPercent: [m.pinEndPercent, 50, 400, 10],
              holdDuration: [m.holdDuration, 0, 2, 0.05],
              replay: {
                type: "action",
              },
            },
            {
              id: "skills-cascade",
              persist: true,
              defaultCollapsed: false,
              onAction: (t) => {
                "replay" === t && e && e();
              },
            },
          )).startYVh ?? m.startYVh,
        rotateX: a.rotateX ?? m.rotateX,
        duration: a.duration ?? m.duration,
        staggerEach: a.staggerEach ?? m.staggerEach,
        scrub: a.scrub ?? m.scrub,
        pinEndPercent: a.pinEndPercent ?? m.pinEndPercent,
        holdDuration: a.holdDuration ?? m.holdDuration,
      });
  return (
    (o.current = c),
    useEffect(() => {
      let e = window.matchMedia("(max-width: 767px)"),
        t = () => l(e.matches);
      return (t(), e.addEventListener("change", t), () => e.removeEventListener("change", t));
    }, []),
    useEffect(() => {
      if (!s.current) return;
      let e = gsap.context(() => {
        let e = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          t = s.current?.querySelectorAll(".skills-headline-char"),
          r = s.current?.querySelectorAll(".skill-card-item");
        if (e) {
          (t &&
            gsap.set(t, {
              y: "0vh",
              opacity: 1,
              rotateX: 0,
            }),
            r &&
              gsap.set(r, {
                opacity: 1,
                y: "0vh",
                rotateX: 0,
              }));
          return;
        }
        if (r && r.length > 0 && n.current) {
          let e = `${Math.max(c.startYVh, 65)}vh`;
          (t &&
            t.length > 0 &&
            gsap.set(t, {
              y: e,
              opacity: 0,
              rotateX: c.rotateX,
            }),
            gsap.set(r, {
              y: e,
              opacity: 0,
              rotateX: c.rotateX,
            }));
          let a = gsap.timeline({
            scrollTrigger: {
              trigger: n.current,
              start: "top top",
              end: `+=${c.pinEndPercent}%`,
              pin: true,
              scrub: c.scrub,
              refreshPriority: 5,
              invalidateOnRefresh: true,
            },
          });
          (t &&
            t.length > 0 &&
            a.to(
              t,
              {
                y: "0vh",
                opacity: 1,
                rotateX: 0,
                stagger: {
                  each: 0.018,
                  from: "start",
                  ease: "power2.out",
                },
                duration: 0.75 * c.duration,
                ease: "power3.out",
              },
              0,
            ),
            a.to(
              r,
              {
                y: "0vh",
                opacity: 1,
                rotateX: 0,
                stagger: {
                  each: c.staggerEach,
                  from: "start",
                  ease: "power2.out",
                },
                duration: c.duration,
                ease: "power3.out",
              },
              0.12,
            ),
            a.to(
              {},
              {
                duration: c.holdDuration,
              },
            ));
        }
      }, s);
      return (ScrollTrigger.sort(), ScrollTrigger.refresh(), () => e.revert());
    }, [c.startYVh, c.rotateX, c.duration, c.staggerEach, c.scrub, c.pinEndPercent, c.holdDuration]),
    (
      <section
        ref={s}
        id="skills"
        className="skills-section relative bg-transparent overflow-hidden scroll-mt-0 pb-10 sm:pb-16 lg:pb-20"
        aria-label="Technical Skills"
      >
        <div
          ref={n}
          className="skills-pinned-stage relative w-full min-h-[100svh] flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-44 max-w-[1920px] mx-auto py-8 sm:py-12 select-none"
        >
          <div className="w-full flex flex-col items-center justify-center">
            <div className="text-center mb-8 sm:mb-12 md:mb-14">
              <h2
                style={{
                  perspective: "1000px",
                }}
                className="text-[clamp(2.6rem,11vw,4.6rem)] md:text-[clamp(2.8rem,6.6vw,6.6rem)] font-black uppercase leading-[0.88] text-foreground tracking-[-0.04em] select-none text-center"
              >
                <span className="block py-1">
                  <span className="inline-block">
                    {"CAPABILITIES".split("").map((e, r) => (
                      <span
                        key={`cap-${r}`}
                        className="skills-headline-char inline-block will-change-transform origin-bottom"
                      >
                        {e}
                      </span>
                    ))}
                  </span>
                </span>
              </h2>
            </div>
            <div
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
              className="relative z-10 w-full max-w-4xl lg:max-w-5xl mx-auto grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3.5 md:gap-4 justify-items-center items-start"
            >
              {A.map((e) => (
                <SkillItem key={e.id} config={e} isMobile={i} />
              ))}
              <div className="skill-card-item will-change-transform select-none w-full origin-bottom">
                <div
                  style={{
                    "--skill-color": "#818cf8",
                  }}
                  className="skill-glass-card relative aspect-square w-full flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl group cursor-default"
                >
                  <div className="relative z-10 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 text-white/50 group-hover:text-white transition-colors duration-200">
                    <span className="font-mono text-base sm:text-lg">{">_"}</span>
                  </div>
                  <span className="relative z-10 mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-mono font-medium tracking-tight text-white/60 group-hover:text-white transition-colors duration-200 text-center truncate max-w-full">
                    {"& MORE"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-24 sm:h-32 md:h-40 lg:h-48 pointer-events-none" aria-hidden="true" />
      </section>
    )
  );
}
gsap.registerPlugin(ScrollTrigger);
let ArrowDownRightIcon = createLucideIcon("arrow-down-right", [
    [
      "path",
      {
        d: "m7 7 10 10",
        key: "1fmybs",
      },
    ],
    [
      "path",
      {
        d: "M17 7v10H7",
        key: "6fjiku",
      },
    ],
  ]),
  O = createLucideIcon("arrow-left", [
    [
      "path",
      {
        d: "m12 19-7-7 7-7",
        key: "1l729n",
      },
    ],
    [
      "path",
      {
        d: "M19 12H5",
        key: "x3x0zl",
      },
    ],
  ]),
  I = createLucideIcon("arrow-right", [
    [
      "path",
      {
        d: "M5 12h14",
        key: "1ays0h",
      },
    ],
    [
      "path",
      {
        d: "m12 5 7 7-7 7",
        key: "xquz4c",
      },
    ],
  ]),
  $ = createLucideIcon("x", [
    [
      "path",
      {
        d: "M18 6 6 18",
        key: "1bl5f8",
      },
    ],
    [
      "path",
      {
        d: "m6 6 12 12",
        key: "d8bk6v",
      },
    ],
  ]);
gsap.registerPlugin(ScrollTrigger);
let U = "(min-width: 1024px)";
function B(e) {
  let t = window.lenis;
  t
    ? t.scrollTo(e, {
        immediate: true,
        force: true,
      })
    : window.scrollTo(0, e);
}
function ProjectModal({ project: e, activeIndex: r, onClose: a, onPrev: s, onNext: n }) {
  let i = e.narrativeHeadline ?? e.highlights[0] ?? "HIGH-PERFORMANCE ARCHITECTURE AND SCALABLE WORKFLOWS",
    l =
      e.technicalConstraints ??
      "Engineered with a modular component architecture and dedicated state pipelines to ensure predictable 60 FPS transitions, zero-downtime data synchronization, and accessible responsive behavior across mobile and desktop viewports.",
    o = e.secondaryImage ?? e.image;
  return (
    <div className="flex flex-col w-full text-zinc-950">
      <div className="px-5 pt-10 pb-6 sm:px-8 sm:pt-12 sm:pb-7 md:px-12 lg:px-14 lg:pt-14 lg:pb-8 xl:px-18 xl:pt-16">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 sm:gap-6">
          <div className="flex items-start justify-between w-full gap-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold uppercase tracking-tight text-zinc-950 leading-none">
              {e.title}
            </h2>
            <div className="flex items-center gap-3 shrink-0 pt-1">
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-zinc-900">
                {"PROJECT "}
                {r + 1}
              </span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 stroke-[1.2]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9.5" strokeDasharray="1.5 2.5" className="opacity-40" />
                <path
                  d="M12 2L13.6 10.4L22 12L13.6 13.6L12 22L10.4 13.6L2 12L10.4 10.4L12 2Z"
                  fill="currentColor"
                  fillOpacity="0.12"
                />
              </svg>
              <button
                type="button"
                onClick={a}
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-zinc-800 hover:bg-black/10 transition-colors cursor-pointer"
                aria-label="Close project view"
              >
                <$ className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row-reverse gap-5 sm:gap-6 lg:gap-0 w-full">
            <div className="relative min-h-[240px] flex-1 min-w-0 sm:min-h-[320px] lg:min-h-0 lg:h-[min(58vh,620px)] rounded-md overflow-hidden bg-[#001122] border border-black/10 shadow-[inset_0_2px_12px_rgba(0,0,0,0.45)]">
              <Image
                src={e.image}
                alt={e.title}
                fill={true}
                priority={true}
                sizes="(max-width: 1024px) 100vw, 75vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.01]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-row lg:flex-col justify-between items-center lg:items-start shrink-0 w-full lg:w-[170px] xl:w-[200px] border-t lg:border-t-0 lg:border-r border-zinc-300/80 pt-4 lg:pt-0 lg:pr-5 xl:pr-6">
              <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-2">
                <button
                  type="button"
                  onClick={a}
                  className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.22em] font-semibold text-zinc-500 hover:text-black py-1 transition-colors text-left cursor-pointer"
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  onClick={s}
                  className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.22em] font-semibold text-zinc-500 hover:text-black py-1 transition-colors text-left cursor-pointer"
                >
                  PREVIOUS
                </button>
                <button
                  type="button"
                  onClick={n}
                  className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.22em] font-semibold text-zinc-500 hover:text-black py-1 transition-colors text-left cursor-pointer"
                >
                  NEXT
                </button>
              </div>
              <div className="flex flex-col items-end lg:items-start pt-2">
                <span
                  className="hidden lg:block text-zinc-300 text-base font-light mb-2 select-none"
                  aria-hidden="true"
                >
                  +
                </span>
                <button
                  type="button"
                  onClick={() => {
                    e.live && "#" !== e.live
                      ? window.open(e.live, "_blank", "noopener,noreferrer")
                      : e.github &&
                        "#" !== e.github &&
                        window.open(e.github, "_blank", "noopener,noreferrer");
                  }}
                  className="group inline-flex items-center gap-1.5 font-mono text-xs sm:text-[13px] uppercase tracking-[0.2em] font-semibold text-zinc-600 hover:text-black transition-colors cursor-pointer"
                >
                  <ArrowDownRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 text-zinc-800" />
                  <span>LIVE LINK</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-zinc-400 font-mono text-[9px] uppercase tracking-[0.25em]">
            <span>Scroll to explore case study</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-300/80 bg-white px-5 py-10 sm:px-8 sm:py-14 md:px-12 lg:px-14 lg:py-20 xl:px-18">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-12 border-b border-zinc-300/70">
            <div className="lg:col-span-3">
              <span className="text-2xl sm:text-3xl font-bold text-zinc-950 font-sans">{e.year}</span>
            </div>
            <div className="lg:col-span-7 space-y-4 text-center">
              <h3 className="mx-auto max-w-[680px] text-xl uppercase leading-tight tracking-tight text-zinc-900 text-balance font-medium sm:text-2xl md:text-[26px]">
                {i}
              </h3>
              <p className="mx-auto max-w-[720px] text-sm leading-relaxed text-zinc-600 sm:text-base">
                {e.description}
              </p>
            </div>
            <div className="hidden lg:flex lg:col-span-2 justify-end gap-1 text-zinc-400 pt-1">
              <span className="text-xl">✻</span>
              <span className="text-xl text-zinc-600">✻</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-10 sm:pt-14 items-start">
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h4 className="text-3xl uppercase leading-[0.95] tracking-tight text-zinc-900 font-semibold sm:text-4xl lg:text-[42px]">
                  ROLE SUMMARY
                </h4>
                <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-zinc-600 sm:text-base">
                  {"Working as "}
                  {e.role}, I engineered the core application workflows, data persistence models, and
                  interactive user interfaces. Every timeline and interaction was calibrated directly in the
                  browser to ensure fluid, responsive operation across devices without layout drift.
                </p>
              </div>
              <div className="pt-6 border-t border-zinc-300/70">
                <h5 className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
                  TECH STACK
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {e.tech.map((e, r) => (
                    <div
                      key={e}
                      className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-zinc-800"
                    >
                      <span className="text-zinc-400 font-medium">0{r + 1}</span>
                      <span className="font-medium">{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-[10px] border border-zinc-300/80 bg-white p-2 shadow-sm">
                <div className="relative w-full h-full rounded-md overflow-hidden bg-zinc-100">
                  <Image
                    src={o}
                    alt={`${e.title} detail view`}
                    fill={true}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-300/80 bg-white px-5 pt-10 pb-28 sm:px-8 sm:pt-14 sm:pb-36 md:px-12 lg:px-14 lg:pt-18 lg:pb-56 xl:px-18">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="w-full overflow-hidden border-y border-zinc-300/60 py-3 mb-10">
            <div className="flex gap-6 whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-zinc-500 font-semibold animate-marquee">
              <span>
                {"* "}
                {e.title}
              </span>
              <span>
                {"* "}
                {e.year}
              </span>
              <span>
                {"* "}
                {e.title}
              </span>
              <span>
                {"* "}
                {e.year}
              </span>
              <span>
                {"* "}
                {e.title}
              </span>
              <span>
                {"* "}
                {e.year}
              </span>
              <span>
                {"* "}
                {e.title}
              </span>
              <span>
                {"* "}
                {e.year}
              </span>
            </div>
          </div>
          <div className="max-w-3xl mx-auto text-center space-y-5 relative py-6">
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300 text-lg font-light select-none hidden md:block"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-300 text-lg font-light select-none hidden md:block"
              aria-hidden="true"
            >
              +
            </span>
            <h4 className="text-xl uppercase tracking-tight text-zinc-900 font-semibold sm:text-2xl md:text-3xl">
              TECHNICAL CONSTRAINTS
            </h4>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">{l}</p>
            <div className="pt-6 flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={n}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-zinc-400 bg-white hover:bg-zinc-950 hover:text-white transition-all duration-300 cursor-pointer shadow-sm text-xs sm:text-sm font-mono uppercase tracking-[0.2em] font-semibold"
                >
                  <span>Discover next project</span>
                  <I className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={a}
                  className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-semibold text-zinc-500 hover:text-black transition-colors cursor-pointer underline underline-offset-4 decoration-zinc-400"
                >
                  Back to featured work
                </button>
              </div>
              <div className="w-px h-8 bg-zinc-400 mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
let F = [0.22, 1, 0.36, 1],
  X = [0.4, 0, 0.2, 1];
function V(e) {
  if (!e) return null;
  let t = e.getBoundingClientRect();
  return t.width <= 0 || t.height <= 0
    ? null
    : {
        left: t.left,
        top: t.top,
        width: t.width,
        height: t.height,
      };
}
let ProjectCard = memo(function ({
  viewportRef: e,
  trackRef: r,
  featured: a,
  activeIndex: s,
  viewportShell: n,
  onOpenExpand: i,
}) {
  let l,
    c,
    d = a[s] ?? a[0],
    u = d?.slug ?? "",
    p = d?.title ?? "",
    m = usePrefersReducedMotion();
  return d ? (
    <div className={`group/shell relative flex w-full flex-col overflow-hidden p-3 sm:p-4 rounded-sm ${n}`}>
      <div ref={e} className="relative min-h-0 w-full flex-1 overflow-hidden rounded-sm">
        <div ref={r} className="absolute inset-0 flex flex-col gap-5 will-change-transform sm:gap-6 lg:gap-8">
          {a.map((e, r) => (
            <div
              key={e.slug}
              className="group/card h-full min-h-0 shrink-0 overflow-hidden rounded-sm border border-border bg-background shadow-sm transition-shadow duration-300 group-hover/shell:shadow-[0_28px_60px_-34px_rgb(0_0_0/.2)]"
            >
              <button
                type="button"
                data-project-index={r}
                onClick={(e) => i(r, e.currentTarget)}
                className="flex h-full min-h-0 w-full cursor-pointer flex-col text-left outline-none ring-foreground/40 focus-visible:ring-2 focus-visible:ring-inset"
                aria-label={`Open ${e.title} case study`}
              >
                <div
                  data-project-image={true}
                  className="relative min-h-0 h-full flex-1 overflow-hidden bg-muted"
                >
                  <div className="relative h-full w-full origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover/card:scale-[1.02]">
                    <Image
                      src={e.image}
                      alt={e.title}
                      fill={true}
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover object-center"
                      priority={0 === r}
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-black/5" />
                </div>
              </button>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between">
          <div className="bg-linear-to-b from-black/75 via-black/35 to-transparent px-4 pb-16 pt-4 sm:px-5 sm:pb-20 sm:pt-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/55 sm:text-[10px]">
              {String(s + 1).padStart(2, "0")}
              {" /"} {String(a.length).padStart(2, "0")}
            </p>
            <motion.h3
              key={u}
              initial={
                !m && {
                  opacity: 0,
                  y: 8,
                  filter: "blur(12px)",
                }
              }
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                willChange: "filter, opacity, transform",
              }}
              className="mt-3 min-h-[2.6em] max-w-[95%] font-black uppercase leading-[0.95] tracking-tight text-white text-[clamp(1.15rem,2.1vw,1.85rem)] wrap-break-word sm:min-h-[2.4em] lg:max-w-[90%]"
              aria-live="polite"
            >
              {p}
            </motion.h3>
            <div className="mt-2 min-h-5 max-w-full">
              <p
                key={`${u}-cat`}
                className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-white/65 sm:text-[10px] sm:tracking-[0.2em] wrap-break-word"
              >
                {
                  ((l = d.tech[0] ?? "Build"),
                  (c = d.tech[1] ?? d.year),
                  `[${l.toUpperCase()}] — [${c.toUpperCase()}]`)
                }
              </p>
            </div>
            <div key={`${u}-tech`} className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {d.tech.slice(0, 4).map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-white/25 bg-white/10 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-white/85 sm:text-[9px]"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
          <div className="px-4 pb-3 sm:px-5 sm:pb-4">
            <div className="flex gap-1.5 sm:gap-2">
              {a.map((e, r) => (
                <div
                  key={e.slug}
                  className="h-0.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/20"
                  title={e.title}
                >
                  <div
                    className="h-full origin-left rounded-full bg-white transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                    style={{
                      transform: `scaleX(${r === s || r < s ? 1 : 0.2})`,
                      opacity: r === s ? 1 : r < s ? 0.55 : 0.35,
                    }}
                  />
                </div>
              ))}
            </div>
            <p className="sr-only">
              {"Project "}
              {s + 1}
              {" of "}
              {a.length}. {d.title}.
            </p>
            <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.28em] text-white/50 sm:text-[9px]">
              Scroll to scrub · Click a project to open
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
});
function Projects() {
  let e = useMemo(() => projects.slice(0, 5), []),
    a = useRef(null),
    s = useRef(null),
    n = useRef(null),
    i = useRef(null),
    l = useRef(0),
    o = useRef(0),
    c = useRef(0),
    d = useRef(null),
    u = useRef(null),
    p = useRef(null),
    m = useRef(null),
    x = useRef(null),
    g = useRef(0),
    h = useRef(null),
    f = useRef(null),
    b = useRef(false),
    v = useRef([]),
    w = useMotionValue(0),
    j = useMotionValue(0),
    y = useMotionValue(1),
    S = useMotionValue(1),
    E = useMotionValue(1),
    A = useMotionValue(0),
    [R, C] = useState(0),
    [D, M] = useState(null),
    [I, $] = useState(false),
    G = e.length,
    H = null !== D,
    K = null !== D ? e[D] : null;
  (useEffect(
    () => () => {
      (document.documentElement.classList.remove("case-study-open"),
        null !== x.current && (window.clearTimeout(x.current), (x.current = null)),
        v.current.forEach((e) => e.stop()),
        (v.current = []));
    },
    [],
  ),
    useEffect(() => {
      if (!H) return;
      document.documentElement.classList.add("case-study-open");
      let e = window.lenis;
      return (
        e?.stop(),
        () => {
          (document.documentElement.classList.remove("case-study-open"), e?.start());
        }
      );
    }, [H]));
  let J = useCallback((e, t = false) => {
      if (!window.matchMedia(U).matches) return;
      let r = i.current;
      !r ||
        (B(r.start + (r.end - r.start) * (e / 4)), t && (ScrollTrigger.update(), r.getTween()?.progress(1)));
    }, []),
    W = useCallback((e) => {
      let t = Array.from(document.querySelectorAll(`#projects [data-project-index="${e}"]`)).find(
        (e) => e.getClientRects().length > 0,
      );
      t && B(Math.max(0, t.getBoundingClientRect().top + window.scrollY - 88));
    }, []),
    Z = useCallback(
      (e, t) => {
        (null !== x.current && (window.clearTimeout(x.current), (x.current = null)),
          (h.current = V(t?.querySelector("[data-project-image]") ?? t ?? null)),
          (f.current = null),
          (b.current = false),
          v.current.forEach((e) => e.stop()),
          (v.current = []),
          w.set(0),
          j.set(0),
          y.set(1),
          S.set(1),
          E.set(1),
          A.set(0),
          document.documentElement.classList.add("case-study-open"),
          0 !== o.current && (window.cancelAnimationFrame(o.current), (o.current = 0)),
          (l.current = e),
          (g.current = e),
          C(e),
          M(e),
          $(false));
      },
      [E, y, S, w, j, A],
    );
  useLayoutEffect(() => {
    if (!H || b.current) return;
    let e = p.current;
    if (!e) return;
    b.current = true;
    let t = h.current;
    h.current = null;
    let r = V(e);
    if (!r) return;
    f.current = r;
    let a = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!t || a) return void A.set(1);
    let s = t.left - r.left,
      n = t.top - r.top,
      i = t.width / r.width,
      l = t.height / r.height;
    (w.set(s),
      j.set(n),
      y.set(i),
      S.set(l),
      E.set(1),
      A.set(0),
      (e.style.transform = `translate3d(${s}px, ${n}px, 0) scale(${i}, ${l})`),
      (v.current = [
        animate(w, 0, {
          duration: 0.62,
          ease: F,
        }),
        animate(j, 0, {
          duration: 0.62,
          ease: F,
        }),
        animate(y, 1, {
          duration: 0.62,
          ease: F,
        }),
        animate(S, 1, {
          duration: 0.62,
          ease: F,
        }),
        animate(A, 1, {
          duration: 0.32,
          delay: 0.3,
          ease: "easeOut",
        }),
      ]));
  }, [E, y, S, w, j, A, H]);
  let Q = useCallback(() => {
    if (null !== x.current) return;
    (v.current.forEach((e) => e.stop()), (v.current = []));
    let e = p.current,
      t = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      r = null;
    (window.matchMedia(U).matches
      ? (J(R, true), (r = V(s.current)))
      : (R !== g.current && W(R),
        (r = V(
          Array.from(
            document.querySelectorAll(`#projects [data-project-index="${R}"] [data-project-image]`),
          ).find((e) => e.getClientRects().length > 0 && e.offsetWidth > 0) ?? null,
        ))),
      $(true));
    let a = f.current;
    if (!e || !a || !r || t) {
      (E.set(0),
        A.set(0),
        (x.current = window.setTimeout(() => {
          ((x.current = null), M(null), $(false), (h.current = null), (f.current = null));
        }, 220 * !t)));
      return;
    }
    let n = r.left - a.left,
      i = r.top - a.top,
      l = r.width / a.width,
      o = r.height / a.height;
    ((v.current = [
      animate(w, n, {
        duration: 0.6,
        ease: X,
      }),
      animate(j, i, {
        duration: 0.6,
        ease: X,
      }),
      animate(y, l, {
        duration: 0.6,
        ease: X,
      }),
      animate(S, o, {
        duration: 0.6,
        ease: X,
      }),
      animate(A, 0, {
        duration: 0.16,
        ease: "easeOut",
      }),
      animate(E, 0, {
        duration: 0.17,
        delay: 0.43,
        ease: "easeIn",
      }),
    ]),
      (x.current = window.setTimeout(() => {
        ((x.current = null), M(null), $(false), (h.current = null), (f.current = null));
      }, 640)));
  }, [R, E, y, S, w, j, A, J, W]);
  (useEffect(() => {
    if (!H) return;
    let e = u.current;
    e && (e.scrollTop = 0);
  }, [D, H]),
    useEffect(() => {
      if (!H) return;
      let e = window.requestAnimationFrame(() => {
        m.current?.focus({
          preventScroll: true,
        });
      });
      return () => window.cancelAnimationFrame(e);
    }, [H]),
    useEffect(() => {
      if (!H) return;
      let e = (e) => {
        "Escape" === e.key && (e.preventDefault(), Q());
      };
      return (window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e));
    }, [Q, H]));
  let ee = useCallback((e) => {
      if ((C(e), (l.current = e), !window.matchMedia(U).matches)) return;
      let t = i.current;
      if (!t) return;
      let r = e / 4;
      !(function (e, t = {}) {
        let r = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          a = window.lenis,
          s = t.offset ?? 0;
        if (a) {
          if (r) {
            (a.scrollTo(e, {
              offset: s,
              immediate: true,
            }),
              window.requestAnimationFrame(() => t.onComplete?.()));
            return;
          }
          a.scrollTo(e, {
            offset: s,
            duration: t.duration ?? 0.9,
            onComplete: t.onComplete,
          });
          return;
        }
        let n = "number" == typeof e ? e + s : e.getBoundingClientRect().top + window.scrollY + s;
        if (
          (window.scrollTo({
            top: n,
            behavior: r ? "auto" : "smooth",
          }),
          !t.onComplete)
        )
          return;
        if (r) return window.requestAnimationFrame(() => t.onComplete?.());
        let i = false,
          l = () => {
            i ||
              ((i = true),
              window.removeEventListener("scrollend", l),
              window.clearTimeout(o),
              t.onComplete?.());
          },
          o = window.setTimeout(l, 950);
        window.addEventListener("scrollend", l, {
          once: true,
        });
      })(t.start + (t.end - t.start) * r, {
        duration: 0.8,
      });
    }, []),
    et = useCallback(
      (e) => {
        ee(e);
      },
      [ee],
    ),
    er = useCallback(
      (e) => {
        if (null !== x.current) return;
        let t = ((D ?? R) + e + G) % G;
        ((l.current = t), C(t), M(t));
      },
      [R, D, G],
    ),
    ea = useCallback(() => er(-1), [er]),
    es = useCallback(() => er(1), [er]);
  return (
    useEffect(() => {
      let e = a.current;
      if (!e) return;
      let t = gsap.context(() => {
        gsap.matchMedia().add(U, () => {
          let t = s.current,
            r = n.current;
          if (!t || !r) return () => {};
          let a = gsap.fromTo(
            r,
            {
              y: 0,
            },
            {
              y: () => -Math.max(0, r.scrollHeight - t.clientHeight),
              ease: "none",
              scrollTrigger: {
                trigger: e,
                start: "top top",
                end: () => `+=${Math.round(3.95 * window.innerHeight)}`,
                pin: true,
                pinSpacing: true,
                scrub: 0.38,
                refreshPriority: 1,
                invalidateOnRefresh: true,
                fastScrollEnd: true,
                onUpdate: (e) => {
                  ((c.current = Math.min(Math.round(4 * e.progress), 4)),
                    0 === o.current &&
                      (o.current = window.requestAnimationFrame(() => {
                        o.current = 0;
                        let e = c.current;
                        e !== l.current && ((l.current = e), C(e));
                      })));
                },
              },
            },
          );
          return (
            (i.current = a.scrollTrigger ?? null),
            () => {
              ((i.current = null), a.scrollTrigger?.kill());
            }
          );
        });
      }, a);
      return () => {
        (0 !== o.current && (window.cancelAnimationFrame(o.current), (o.current = 0)),
          (i.current = null),
          t.revert());
      };
    }, []),
    (
      <>
        <section
          ref={a}
          id="projects"
          className="projects-section scroll-mt-24 bg-transparent text-foreground relative"
          aria-label="Projects"
        >
          <div
            aria-hidden={H || undefined}
            className={`mx-auto w-full max-w-[1920px] px-5 pt-16 pb-28 sm:px-8 sm:pt-20 sm:pb-36 md:px-12 lg:px-14 lg:pt-20 lg:pb-44 xl:px-18 xl:pt-24 xl:pb-48 2xl:max-w-none 2xl:px-24 ${H ? "pointer-events-none" : ""} ${H && !I ? "invisible" : ""}`}
          >
            <div className="lg:hidden">
              <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                FEATURED WORK
              </h2>
              <div className="mt-8 flex flex-col gap-14 sm:mt-10 sm:gap-16 md:gap-20">
                {e.map((e, r) => {
                  let a;
                  return (
                    <motion.article
                      key={e.slug}
                      initial={{
                        opacity: 0,
                        y: 36,
                        scale: 0.98,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                        margin: "-40px",
                      }}
                      transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.05 * r,
                      }}
                      className="w-full"
                    >
                      <button
                        type="button"
                        data-project-index={r}
                        onClick={(e) => Z(r, e.currentTarget)}
                        className="group w-full text-left outline-none ring-foreground/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <div
                          data-project-image={true}
                          className="relative aspect-16/10 w-full overflow-hidden rounded-sm border border-border bg-muted"
                        >
                          <Image
                            src={e.image}
                            alt={e.title}
                            fill={true}
                            sizes="100vw"
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                            priority={0 === r}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent" />
                        </div>
                        <h3 className="mt-4 font-black uppercase leading-tight tracking-tight text-foreground sm:mt-5 sm:text-xl md:text-2xl">
                          {e.title}
                        </h3>
                        <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-foreground/45 sm:text-[11px]">
                          {0 === (a = e.tech.slice(0, 3).map((e) => `[${e.toUpperCase()}]`)).length
                            ? `[${e.year}]`
                            : a.join(" — ")}
                        </p>
                      </button>
                    </motion.article>
                  );
                })}
              </div>
            </div>
            <div className="hidden gap-8 lg:flex lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
              <div className="flex w-full shrink-0 flex-col lg:w-[min(100%,320px)] xl:w-[360px]">
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/45">
                  SELECTED PROJECTS
                </span>
                <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tighter text-foreground sm:text-4xl lg:text-5xl">
                  FEATURED
                  <br />
                  WORK
                </h2>
                <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:gap-3">
                  {e.map((e, r) => {
                    let a = R === r;
                    return (
                      <button
                        key={e.slug}
                        type="button"
                        onClick={() => et(r)}
                        className="group flex items-center gap-3 rounded-sm text-left outline-none ring-foreground/30 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <motion.div
                          animate={{
                            scale: a ? 1 : 0.78,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 340,
                            damping: 28,
                            mass: 0.72,
                          }}
                          className="relative h-12 w-20 shrink-0 origin-left overflow-hidden rounded-sm border border-border bg-transparent sm:h-14 sm:w-24 xl:h-15 xl:w-26"
                          aria-hidden={true}
                        >
                          <img
                            src={e.image}
                            alt=""
                            width={160}
                            height={90}
                            loading="eager"
                            decoding="async"
                            draggable={false}
                            className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
                          />
                          {a ? (
                            <motion.span
                              layoutId="projects-left-active-frame"
                              className="pointer-events-none absolute inset-0 z-30 rounded-sm border-2 border-primary/45"
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 34,
                                mass: 0.7,
                              }}
                              aria-hidden={true}
                            />
                          ) : null}
                          {a ? null : (
                            <span
                              className="pointer-events-none absolute inset-0 z-20 bg-muted/65"
                              aria-hidden={true}
                            />
                          )}
                        </motion.div>
                        <span className="relative h-2 w-2 shrink-0" aria-hidden={true}>
                          {a ? (
                            <motion.span
                              layoutId="projects-left-active-dot"
                              className="absolute inset-0 rounded-[2px] bg-primary"
                              transition={{
                                type: "spring",
                                stiffness: 460,
                                damping: 32,
                                mass: 0.6,
                              }}
                            />
                          ) : (
                            <span className="absolute inset-0 rounded-[2px] bg-muted-foreground/40 transition-colors group-hover:bg-muted-foreground/60" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="min-h-0 flex-1 lg:flex-[1.45] lg:pl-2">
                <ProjectCard
                  viewportRef={s}
                  trackRef={n}
                  featured={e}
                  activeIndex={R}
                  viewportShell="h-[64dvh] min-h-[280px] lg:h-[min(72vh,640px)] lg:min-h-[420px] xl:h-[min(74vh,680px)]"
                  onOpenExpand={Z}
                />
              </div>
            </div>
          </div>
          {H && K ? (
            <div
              ref={d}
              className="fixed inset-x-0 top-0 z-20 h-[100dvh] px-3 pb-6 pt-[132px] sm:px-5 lg:px-8 xl:px-12 2xl:px-16"
              role="region"
              aria-label={`${K.title} case study`}
            >
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: +!I,
                }}
                transition={{
                  duration: 0.26,
                  delay: 0.18 * !I,
                  ease: "easeOut",
                }}
                className="fixed inset-x-0 top-0 z-30 bg-background/90 backdrop-blur-xl"
              >
                <div className="mx-auto flex h-14 max-w-[1920px] items-center justify-between gap-4 px-3 sm:px-5 lg:px-8 xl:px-12 2xl:px-16">
                  <button
                    ref={m}
                    type="button"
                    onClick={Q}
                    disabled={I}
                    className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75 transition-colors duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50 sm:px-4 sm:text-[11px]"
                  >
                    <O className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Back to featured work</span>
                    <span className="sm:hidden">Back</span>
                  </button>
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-[11px]">
                    {String((D ?? 0) + 1).padStart(2, "0")}
                    {" /"} {String(G).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
              <motion.div
                ref={p}
                style={{
                  x: w,
                  y: j,
                  scaleX: y,
                  scaleY: S,
                  opacity: E,
                  transformOrigin: "0 0",
                }}
                className="relative z-0 mx-auto h-full min-h-0 w-full max-w-[1720px] overflow-hidden rounded-[10px] bg-white text-zinc-950 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.75)]"
              >
                <motion.div
                  style={{
                    opacity: A,
                  }}
                  className="h-full min-h-0"
                >
                  <div
                    ref={u}
                    data-lenis-prevent={true}
                    tabIndex={0}
                    aria-label="Case study content"
                    className="scrollbar-hidden h-full overflow-y-auto overscroll-contain outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zinc-400/80"
                  >
                    <ProjectModal project={K} activeIndex={D ?? 0} onClose={Q} onPrev={ea} onNext={es} />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ) : null}
        </section>
      </>
    )
  );
}
function ExperienceItem({ item: e, index: r }) {
  let a = r % 2 == 0 ? "left" : "right",
    s = `experience-${e.id}-title`;
  return (
    <article
      id={`experience-${e.id}`}
      data-experience-entry={r}
      data-revealed="false"
      aria-labelledby={s}
      className="experience-entry relative w-full flex items-center justify-between min-h-[140px] sm:min-h-[180px] lg:min-h-[220px] py-4 sm:py-6"
    >
      <div className="w-[44%] md:w-[43%] flex flex-col justify-center min-w-0">
        {"left" === a ? (
          <div className="experience-copy experience-copy-left flex flex-col items-end text-right pr-2 sm:pr-4 lg:pr-6">
            <span className="font-mono text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider text-white/50">
              {e.period}
            </span>
            <span className="font-mono text-xl sm:text-3xl lg:text-5xl font-black text-white leading-none tracking-tight mt-0.5">
              {e.year}
            </span>
            <h3
              id={s}
              className="text-xs sm:text-base lg:text-xl font-bold uppercase text-white tracking-tight mt-1 leading-tight"
            >
              {e.company}
            </h3>
            <p className="font-mono text-[8.5px] sm:text-[10.5px] lg:text-xs text-white/70 uppercase tracking-wider mt-0.5">
              {e.role}
            </p>
          </div>
        ) : null}
      </div>
      <div className="relative w-[12%] md:w-[14%] flex items-center justify-center shrink-0">
        <div
          data-experience-anchor={r}
          className={cn(
            "absolute w-2 h-2 pointer-events-none",
            "left" === a ? "left-0 -translate-x-1" : "right-0 translate-x-1",
          )}
        />
      </div>
      <div className="w-[44%] md:w-[43%] flex flex-col justify-center min-w-0">
        {"right" === a ? (
          <div className="experience-copy experience-copy-right flex flex-col items-start text-left pl-2 sm:pl-4 lg:pl-6">
            <span className="font-mono text-[8px] sm:text-[9px] lg:text-[10px] uppercase tracking-wider text-white/50">
              {e.period}
            </span>
            <span className="font-mono text-xl sm:text-3xl lg:text-5xl font-black text-white leading-none tracking-tight mt-0.5">
              {e.year}
            </span>
            <h3
              id={s}
              className="text-xs sm:text-base lg:text-xl font-bold uppercase text-white tracking-tight mt-1 leading-tight"
            >
              {e.company}
            </h3>
            <p className="font-mono text-[8.5px] sm:text-[10.5px] lg:text-xs text-white/70 uppercase tracking-wider mt-0.5">
              {e.role}
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
let K = [
  {
    "id": "bca-college",
    "year": "2021",
    "period": "SEPTEMBER 2021 — MARCH 2024",
    "badge": "DEGREE",
    "isCurrent": false,
    "company": "Sree Sabareesa College Murikkumvayal",
    "role": "Bachelor of Computer Applications (BCA)",
    "location": "Kottayam, India",
    "type": "University Degree",
    "overview": "Undergraduate degree in Computer Applications, completed between September 2021 and March 2024.",
    "highlightsLabel": "Academic highlights",
    "stackLabel": "Focus areas",
    "deliverables": [
      "Completed a Bachelor of Computer Applications (BCA) at Sree Sabareesa College Murikkumvayal.",
      "Built the programming and database foundations that led into full stack web development."
    ],
    "tech": [
      "Computer Applications",
      "Programming",
      "Databases",
      "Web Technologies"
    ]
  },
  {
    "id": "php-intern",
    "year": "2024",
    "period": "AUGUST 2024 — FEBRUARY 2025",
    "badge": "INTERNSHIP",
    "isCurrent": false,
    "company": "PHP Full Stack Development",
    "role": "Intern",
    "location": "Ernakulam, India",
    "type": "Full Stack Internship",
    "overview": "Internship in PHP full stack development in Ernakulam.",
    "highlightsLabel": "Selected impact",
    "stackLabel": "Core stack",
    "deliverables": [
      "Worked as an intern in PHP full stack development.",
      "Developed web pages and server-side features using PHP with a MySQL database."
    ],
    "tech": [
      "PHP",
      "MySQL",
      "HTML5",
      "CSS3",
      "JavaScript",
      "XAMPP"
    ]
  },
  {
    "id": "mern-intern",
    "year": "2025",
    "period": "JUNE 2025 — DECEMBER 2025",
    "badge": "INTERNSHIP",
    "isCurrent": false,
    "company": "MERN Stack Development",
    "role": "Intern",
    "location": "Ernakulam, India",
    "type": "Full Stack Internship",
    "overview": "Hands-on MERN stack internship working on real-time projects.",
    "highlightsLabel": "Selected impact",
    "stackLabel": "Core stack",
    "deliverables": [
      "Worked on real-time projects using MongoDB, Express.js, React and Node.js.",
      "Developed responsive web applications.",
      "Gained hands-on experience with REST APIs, routing and front-end integration."
    ],
    "tech": [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "REST APIs"
    ]
  },
  {
    "id": "d3innovatives",
    "year": "2026",
    "period": "APRIL 2026 — PRESENT",
    "badge": "CURRENT ROLE",
    "isCurrent": true,
    "company": "D3Innovatives",
    "role": "MERN Stack Developer",
    "location": "Malappuram, India",
    "type": "Enterprise ERP & POS Engineering",
    "overview": "Developing and maintaining enterprise-level ERP and POS applications using React.js, TypeScript and Tailwind CSS.",
    "highlightsLabel": "Selected impact",
    "stackLabel": "Core stack",
    "deliverables": [
      "Built reusable, responsive UI components and implemented modern React architecture with React Hooks.",
      "Integrated REST APIs using TanStack React Query and developed search, filtering, pagination and dynamic forms.",
      "Developed key ERP modules including Product Management, Customer Management, Inventory, Billing, POS and Reports.",
      "Implemented barcode generation, receipt template customization, thermal printer configuration and WebSocket-based printing.",
      "Collaborated with backend developers using Git to integrate APIs, resolve issues and deliver production-ready features."
    ],
    "tech": [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack React Query",
      "WebSocket",
      "Git"
    ]
  }
];
function Experience() {
  let e = useRef(null),
    a = useRef(null),
    s = useRef(null),
    n = useRef(null),
    i = useRef(null),
    [l, o] = useState([]),
    [c, d] = useState(() => K.map(() => false));
  return (
    useEffect(() => {
      let t = e.current,
        r = a.current,
        l = s.current,
        c = n.current,
        u = i.current;
      if (!t || !r || !l || !c || !u) return;
      let p = Array.from(r.querySelectorAll("[data-experience-entry]")),
        m = 0,
        x = false,
        g = [0, 0.33, 0.66, 0.98],
        h = 1e3,
        f = () => {
          if (x) return;
          let e = r.getBoundingClientRect(),
            t = p.map((t) => {
              let r = t.querySelector("[data-experience-anchor]");
              if (!r)
                return {
                  x: e.width / 2,
                  y: 0,
                };
              let a = r.getBoundingClientRect();
              return {
                x: a.left + a.width / 2 - e.left,
                y: a.top + a.height / 2 - e.top,
              };
            });
          o(t);
          let a = [
              {
                x: e.width / 2,
                y: 0,
              },
              ...t,
            ],
            s = (function (e) {
              if (0 === e.length) return "";
              let t = e[0],
                r = `M ${t.x} ${t.y}`;
              for (let t = 1; t < e.length; t += 1) {
                let a = e[t];
                r += ` L ${a.x} ${a.y}`;
              }
              return r;
            })(a);
          (u.setAttribute("d", s), c.setAttribute("d", s));
          try {
            let e = [],
              t = 0;
            for (let r = 1; r < a.length; r += 1) {
              let s = a[r].x - a[r - 1].x,
                n = a[r].y - a[r - 1].y;
              ((t += Math.sqrt(s * s + n * n)), e.push(t));
            }
            ((h = t || c.getTotalLength() || 1e3),
              (c.style.strokeDasharray = String(h)),
              (g = e.map((e) => (t > 0 ? e / t : 0))));
          } catch {
            ((h = 1e3), (g = [0.15, 0.42, 0.7, 0.98]));
          }
        };
      f();
      let b = gsap.context(() => {
          ScrollTrigger.create({
            trigger: r,
            start: "top 72%",
            end: "bottom 78%",
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (e) => {
              let t = e.progress;
              c && (c.style.strokeDashoffset = String((1 - t) * h));
              let r = [];
              (p.forEach((e, a) => {
                let s = t >= (g[a] ?? 0) - 0.02;
                (r.push(s), e.setAttribute("data-revealed", s ? "true" : "false"));
              }),
                d(r));
            },
          }).update();
        }, t),
        v = new ResizeObserver(() => {
          0 !== m ||
            x ||
            (m = window.requestAnimationFrame(() => {
              ((m = 0), f(), ScrollTrigger.refresh());
            }));
        });
      return (
        v.observe(r),
        window.addEventListener("resize", f),
        document.fonts?.ready.then(() => {
          x || (f(), ScrollTrigger.refresh());
        }),
        () => {
          ((x = true),
            0 !== m && window.cancelAnimationFrame(m),
            v.disconnect(),
            window.removeEventListener("resize", f),
            b.revert());
        }
      );
    }, []),
    (
      <section
        ref={e}
        id="experience"
        className="experience-section relative bg-transparent pb-24 pt-20 text-white sm:pb-32 sm:pt-28 lg:pb-40 lg:pt-36"
        aria-label="Career record and experience timeline"
      >
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-44">
          <div className="h-px w-full origin-left bg-white/20" />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-white/60">
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">CAREER RECORD</span>
              <span className="h-px w-6 bg-white/30" aria-hidden="true" />
              <span>2022 — PRESENT</span>
            </div>
            <span className="text-white/40">
              {String(K.length).padStart(2, "0")}
              {" MILESTONES / CHRONOLOGICAL"}
            </span>
          </div>
          <div ref={a} className="relative mt-8 sm:mt-12 lg:mt-16 pt-8 sm:pt-12 lg:pt-16">
            <svg
              ref={s}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            >
              <defs>
                <filter id="timeline-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                ref={i}
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
              <path
                ref={n}
                fill="none"
                stroke="#ffffff"
                strokeWidth={2.4}
                strokeLinecap="round"
                filter="url(#timeline-glow)"
                style={{
                  strokeDashoffset: 1e3,
                  transition: "stroke-dashoffset 0.1s linear",
                }}
              />
              {l.map((e, r) => {
                let a = c[r] ?? false;
                return (
                  <g key={r}>
                    {a ? (
                      <circle
                        cx={e.x}
                        cy={e.y}
                        r={7}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={1.5}
                        filter="url(#timeline-glow)"
                      />
                    ) : null}
                    <circle
                      cx={e.x}
                      cy={e.y}
                      r={a ? 4 : 2}
                      fill={a ? "#ffffff" : "rgba(255, 255, 255, 0.25)"}
                      filter={a ? "url(#timeline-glow)" : undefined}
                    />
                  </g>
                );
              })}
            </svg>
            <div className="relative z-10 flex flex-col gap-6 sm:gap-10 lg:gap-14">
              {K.map((e, r) => (
                <ExperienceItem
                  key={e.id}
                  item={e}
                  index={r}
                  isActive={c[r] ?? false}
                  isLast={r === K.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  );
}
function W(e, t = []) {
  let a = useRef(null);
  return (
    useEffect(() => {
      if (!a.current) return;
      let t = gsap.context(() => {
        e();
      }, a);
      return () => {
        t.revert();
      };
    }, t),
    a
  );
}
(gsap.registerPlugin(ScrollTrigger), gsap.registerPlugin(ScrollTrigger));
let TwitterIcon = createLucideIcon("twitter", [
  [
    "path",
    {
      d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
      key: "pff0z6",
    },
  ],
]);
function Contact() {
  let [e, a] = useState(false),
    s = useRef(null),
    n = {
      GitHub: Github,
      LinkedIn: Linkedin,
      Twitter: TwitterIcon,
    },
    i = PERSONAL_DATA.socials
      .filter((e) => e.name in n)
      .map((e) => ({
        name: e.name,
        icon: n[e.name],
        url: e.url,
      })),
    [l, o] = PERSONAL_DATA.contact.email.split("@"),
    c = W(() => {
      let e = gsap.timeline({
        scrollTrigger: {
          trigger: c.current,
          start: "top 70%",
          end: "bottom 80%",
        },
      });
      (e.from(".contact-header-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      }),
        e.from(
          ".contact-content",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5",
        ),
        e.from(
          ".email-card",
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.6",
        ));
      let t = s.current;
      t &&
        (t.addEventListener("mouseenter", () => {
          (gsap.to(t, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          }),
            gsap.to(".email-icon", {
              x: 5,
              y: -5,
              duration: 0.3,
            }));
        }),
        t.addEventListener("mouseleave", () => {
          (gsap.to(t, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          }),
            gsap.to(".email-icon", {
              x: 0,
              y: 0,
              duration: 0.3,
            }));
        }));
    }, []);
  return (
    <section
      ref={c}
      id="contact"
      className="contact-section relative w-full py-32 bg-transparent overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-foreground/4 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-foreground/3 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="space-y-12">
            <div className="space-y-2 overflow-hidden">
              <div className="overflow-hidden">
                <span className="contact-header-text block text-xs uppercase tracking-[0.3em] text-foreground/45 font-medium mb-4">
                  CONTACT
                </span>
              </div>
              <div className="overflow-hidden">
                <h2 className="contact-header-text block text-[clamp(2.5rem,6.5vw,5.5rem)] font-black uppercase leading-[0.92] text-foreground">
                  GOT SOMETHING THAT
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="contact-header-text block text-[clamp(2.5rem,6.5vw,5.5rem)] font-black uppercase leading-[0.92] text-foreground/40">
                  NEEDS TO BE BUILT?
                </h2>
              </div>
            </div>
            <div className="space-y-8 max-w-md">
              <p className="contact-content text-base sm:text-lg text-foreground/75 leading-relaxed font-light">
                {
                  "Tell me the problem. I'll work out the right way to solve it, then build it and ship it. Based in "
                }
                {PERSONAL_DATA.location}, and available on-site anywhere in Kerala.
              </p>
              <div className="contact-content flex gap-4">
                {i.map((e) => (
                  <a
                    key={e.name}
                    href={e.url}
                    className="group flex items-center justify-center w-12 h-12 rounded-full border border-border bg-muted/30 hover:bg-foreground hover:border-transparent transition-all duration-300"
                    aria-label={e.name}
                  >
                    <e.icon className="w-5 h-5 text-foreground/60 group-hover:text-background transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-center lg:pt-12">
            <a
              ref={s}
              href={`mailto:${PERSONAL_DATA.contact.email}`}
              className="email-card group relative block w-full h-[300px] lg:h-[400px] overflow-hidden bg-transparent border-t border-border hover:border-foreground/50 transition-colors duration-500 pt-8 sm:pt-12"
            >
              <div className="relative h-full flex flex-col justify-between z-10 px-2 sm:px-0">
                <div className="flex justify-between items-start">
                  <div className="p-0">
                    <Mail className="w-8 h-8 text-foreground/50 group-hover:text-foreground transition-colors duration-500" />
                  </div>
                  <div className="email-icon">
                    <ArrowUpRight className="w-8 h-8 text-foreground/35 group-hover:text-foreground group-hover:rotate-45 transition-all duration-300" />
                  </div>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-foreground/45 mb-4 block">
                    {"DROP ME A LINE • "}
                    {PERSONAL_DATA.location.toUpperCase()}
                  </span>
                  <h3 className="flex flex-col text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black uppercase text-foreground mb-4 leading-[0.9]">
                    <span>{l.toUpperCase()}</span>
                    <span className="text-foreground/50">@{o.toUpperCase()}</span>
                  </h3>
                  <div className="text-xs font-mono uppercase text-foreground/60 mb-6">
                    DIRECT PHONE / WHATSAPP:{" "}
                    <span className="text-foreground font-semibold">
                      {PERSONAL_DATA.contact.displayPhone}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      (e.preventDefault(),
                        navigator.clipboard.writeText(PERSONAL_DATA.contact.email),
                        a(true),
                        setTimeout(() => a(false), 2e3));
                    }}
                    className="inline-flex items-center gap-3 text-sm uppercase tracking-wider text-foreground/50 hover:text-foreground transition-all group/btn"
                  >
                    {e ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">EMAIL COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="group-hover/btn:underline decoration-foreground/30 underline-offset-4">
                          COPY ADDRESS
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
gsap.registerPlugin(ScrollTrigger);
let ArrowUpIcon = createLucideIcon("arrow-up", [
  [
    "path",
    {
      d: "m5 12 7-7 7 7",
      key: "hav0vg",
    },
  ],
  [
    "path",
    {
      d: "M12 19V5",
      key: "x0mq9r",
    },
  ],
]);
gsap.registerPlugin(ScrollTrigger);
let el = {
    Email: Mail,
    GitHub: Github,
    LinkedIn: Linkedin,
    Twitter: TwitterIcon,
  },
  eo = PERSONAL_DATA.socials
    .filter((e) => e.name in el)
    .map((e) => ({
      name: e.name,
      icon: el[e.name],
      url: e.url,
    }));
function Footer() {
  let e = new Date().getFullYear(),
    a = useRef(null);
  return (
    useEffect(() => {
      if (!a.current) return;
      let e = gsap.context(() => {
        let e = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          t = a.current?.querySelector(".footer-top-line"),
          r = a.current?.querySelectorAll(".footer-nav-link"),
          s = a.current?.querySelector(".footer-brand-title"),
          n = a.current?.querySelector(".footer-bottom-bar");
        if (e) {
          (t &&
            gsap.set(t, {
              scaleX: 1,
            }),
            r &&
              gsap.set(r, {
                opacity: 1,
                x: 0,
              }),
            s &&
              gsap.set(s, {
                opacity: 1,
                letterSpacing: "normal",
              }),
            n &&
              gsap.set(n, {
                opacity: 1,
                y: 0,
              }));
          return;
        }
        (t &&
          gsap.fromTo(
            t,
            {
              scaleX: 0,
            },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: t,
                start: "top 95%",
              },
            },
          ),
          r &&
            r.length > 0 &&
            gsap.fromTo(
              r,
              {
                opacity: 0,
                x: -20,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.75,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: r[0],
                  start: "top 95%",
                },
              },
            ),
          s &&
            gsap.fromTo(
              s,
              {
                opacity: 0,
                y: 30,
                letterSpacing: "0.15em",
              },
              {
                opacity: 1,
                y: 0,
                letterSpacing: "0em",
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: s,
                  start: "top 92%",
                },
              },
            ),
          n &&
            gsap.fromTo(
              n,
              {
                opacity: 0,
                y: 20,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: n,
                  start: "top 98%",
                },
              },
            ));
      }, a);
      return () => e.revert();
    }, []),
    (
      <footer
        ref={a}
        className="relative bg-background w-full overflow-hidden border-t border-border pt-20 pb-10 z-10"
      >
        <div className="footer-top-line absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-foreground/25 to-transparent origin-center will-change-transform" />
        <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-foreground/5 blur-[90px] rounded-full pointer-events-none" />
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 relative z-10">
          <div className="flex flex-col gap-8 sm:gap-10 mb-8 sm:mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-foreground/45 font-medium mb-6 block">
                  NAVIGATION
                </span>
                <nav className="flex flex-col gap-3">
                  {["ABOUT", "SKILLS", "PROJECTS", "EXPERIENCE"].map((e) => (
                    <a
                      key={e}
                      href={`#${e.toLowerCase()}`}
                      className="footer-nav-link text-lg md:text-xl uppercase font-bold text-foreground/60 hover:text-foreground transition-all tracking-wide w-fit hover:translate-x-1.5 duration-200 will-change-transform"
                    >
                      {e}
                    </a>
                  ))}
                </nav>
              </div>
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="group flex flex-col items-center gap-2 text-foreground/45 hover:text-foreground transition-colors cursor-pointer"
              >
                <div className="p-3 rounded-full border border-border group-hover:border-foreground/40 group-hover:bg-muted transition-all duration-300">
                  <ArrowUpIcon className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-mono">BACK TO TOP</span>
              </button>
            </div>
            <div className="border-y border-border/40 py-2 sm:py-3 lg:py-4 overflow-hidden">
              <h1 className="footer-brand-title text-[clamp(3.5rem,14vw,14rem)] font-black uppercase text-white leading-none tracking-[-0.03em] text-center select-none pointer-events-none will-change-transform">
                {PERSONAL_DATA.name.toUpperCase()}
              </h1>
            </div>
          </div>
          <div className="footer-bottom-bar flex flex-col-reverse md:flex-row justify-between items-center gap-6 md:gap-0 will-change-transform">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
              <p className="text-foreground/45 text-xs uppercase tracking-wider font-mono">
                {"© "}
                {e} {PERSONAL_DATA.name.toUpperCase()}
              </p>
              <span className="hidden md:block text-foreground/15">|</span>
              <p className="text-foreground/45 text-xs uppercase tracking-wider font-mono">
                {PERSONAL_DATA.tagline.toUpperCase()}
                {" •"} {PERSONAL_DATA.location.toUpperCase()}
              </p>
            </div>
            <div className="flex gap-4">
              {eo.map((e) => (
                <a
                  key={e.name}
                  href={e.url}
                  className="group p-2.5 rounded-full border border-border bg-muted/40 hover:bg-muted hover:border-foreground/40 transition-all duration-300 hover:scale-105"
                  aria-label={e.name}
                >
                  <e.icon className="w-4 h-4 text-foreground/55 group-hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  );
}
let ed = [
  {
    id: "hero",
    label: "HERO",
  },
  {
    id: "about",
    label: "ABOUT",
  },
  {
    id: "skills",
    label: "SKILLS",
  },
  {
    id: "projects",
    label: "PROJECTS",
  },
  {
    id: "experience",
    label: "EXPERIENCE",
  },
];
function eu(e) {
  return e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;
}
function ep(e, t, r) {
  return Math.max(t, Math.min(r, e));
}
function SectionRuler() {
  let e,
    a = {
      detachZonePx:
        (e = useDialKit(
          "Kinetic Ruler: Thresholds",
          {
            detachZonePx: [g.detachZonePx, 100, 500, 10],
            flipStartY: [g.flipStartY, 100, 500, 10],
            flipEndY: [g.flipEndY, 10, 150, 5],
          },
          {
            id: "kinetic-ruler",
            persist: true,
            defaultCollapsed: true,
          },
        )).detachZonePx ?? g.detachZonePx,
      flipStartY: e.flipStartY ?? g.flipStartY,
      flipEndY: e.flipEndY ?? g.flipEndY,
    },
    s = useRef(null),
    n = useRef({}),
    i = useRef([]),
    l = useRef(null),
    o = useRef(null),
    [c, u] = useState(false),
    [p, m] = useState(null),
    x = useCallback((e) => {
      let t = document.getElementById(e);
      t &&
        t.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, []),
    h = useMemo(
      () =>
        ed.map((e) => {
          let t = e.label.split(""),
            r = t.length;
          return {
            chars: t,
            N: r,
            totalW: 29.759999999999998 * r,
            O: 1 + (r - 1) * 0.08,
          };
        }),
      [],
    );
  return (useEffect(() => {
    u(true);
    let e = 0,
      t = a.detachZonePx,
      r = a.flipStartY,
      c = a.flipEndY,
      d = () => {
        let a = window.innerHeight,
          u = window.innerWidth,
          m = ep(window.scrollY / Math.max(1, document.documentElement.scrollHeight - a), 0, 1);
        if (u < 768) {
          (s.current && (s.current.style.display = "none"), (e = requestAnimationFrame(d)));
          return;
        }
        (s.current && (s.current.style.display = "block"),
          l.current && (l.current.style.top = `${100 * m}%`),
          o.current && (o.current.textContent = `${String(Math.round(100 * m)).padStart(3, "0")}%`));
        let x = u - 58,
          g = u - 50,
          f = a - 52,
          b = [];
        ed.forEach((e) => {
          let t = document.getElementById(e.id);
          t ? b.push(t.getBoundingClientRect().top) : b.push(2 * a);
        });
        let v = ed.map((e, s) => {
          let n = b[s];
          if (0 === s)
            return {
              detachP: 1,
              flipP: 1,
              surpassP: ep((r - (b[1] ?? a)) / (r - c), 0, 1),
              ridingY: 80,
            };
          let i = 1 === s ? 0.72 * a : a,
            l = ep((i - n) / t, 0, 1),
            o = ep((r - n) / (r - c), 0, 1),
            d = 0;
          d =
            s < ed.length - 1
              ? ep((r - (b[s + 1] ?? a)) / (r - c), 0, 1)
              : ep((c - n - 0.12 * a) / Math.max(1, 0.55 * a), 0, 1);
          let u = f - (ed.length - 1 - s) * 28,
            { totalW: p } = h[s],
            m = ep((n - c) / Math.max(1, i - c), 0, 1),
            x = 80 + (s + 1) * 26 + 22 + 35;
          return {
            detachP: l,
            flipP: o,
            surpassP: d,
            ridingY: x + m * (u - (0.44 * p) / 2 - 25 - x),
          };
        });
        (ed.forEach((e, t) => {
          let { chars: r, N: a, totalW: s, O: l } = h[t],
            { detachP: o, flipP: c, surpassP: d, ridingY: u } = v[t],
            m = p === t,
            b = f - (ed.length - 1 - t) * 28,
            w = 80 + 26 * t,
            j = 80 + 26 * t + 22,
            y = 1 / 0,
            N = -1 / 0,
            k = 1 / 0,
            S = -1 / 0;
          r.forEach((e, r) => {
            let i = n.current[`${t}-${r}`];
            if (!i) return;
            let p = (r + 0.5) * 29.759999999999998,
              h = a - 1 - r,
              f = 0,
              v = 0,
              E = 0,
              T = 0.4,
              A = 0.35;
            if (o < 1) {
              let e = eu(ep(o * l - 0.08 * h, 0, 1)),
                t = g - (s - p) * 0.4,
                n = u - (r - (a - 1) / 2) * 13.094399999999998,
                i = Math.min(t, x) - 60,
                c = Math.min(b, n) - 25,
                d = 1 - e;
              ((f = d * d * t + 2 * d * e * i + e * e * x),
                (v = d * d * b + 2 * d * e * c + e * e * n),
                (E = 0 + -90 * e),
                (T = 0.4 + (0.44 - 0.4) * e),
                (A = 0.35 + 0.4 * e));
            } else if (0 === c)
              ((f = x), (v = u - (r - (a - 1) / 2) * 13.094399999999998), (E = -90), (T = 0.44), (A = 0.75));
            else if (c < 1) {
              let e = eu(ep(c * l - 0.08 * h, 0, 1)),
                t = u - (r - (a - 1) / 2) * 13.094399999999998,
                n = g - (s - p) * 1,
                i = Math.min(x, n) - 50,
                o = 1 - e;
              ((f = o * o * x + 2 * o * e * i + e * e * n),
                (v = o * o * t + 2 * o * e * ((t + j) / 2 - 15) + e * e * j),
                (E = -90 + 90 * e),
                (T = 0.44 + 0.56 * e),
                (A = 0.75 + 0.25 * e));
            } else if (d < 1) {
              let e = g - (s - p) * 1;
              if (d > 0) {
                let t = eu(d);
                ((f = e + (g - (s - p) * 0.36 - e) * t),
                  (v = j + (w - j) * t),
                  (E = 0),
                  (T = 1 + -0.64 * t),
                  (A = 1 + -0.55 * t));
              } else ((f = e), (v = j), (E = 0), (T = 1), (A = 1));
            } else ((f = g - (s - p) * 0.36), (v = w), (E = 0), (T = 0.36), (A = 0.45));
            (m && (A = Math.max(A, 0.95)),
              (i.style.transform = `translate3d(${f.toFixed(1)}px, ${v.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${E.toFixed(1)}deg) scale(${T.toFixed(3)})`),
              (i.style.opacity = A.toFixed(2)),
              (y = Math.min(y, f - (29.759999999999998 * T) / 2)),
              (N = Math.max(N, f + (29.759999999999998 * T) / 2)),
              (k = Math.min(k, v - (48 * T) / 2)),
              (S = Math.max(S, v + (48 * T) / 2)));
          });
          let E = i.current[t];
          E &&
            isFinite(y) &&
            ((E.style.left = `${(y - 6).toFixed(0)}px`),
            (E.style.top = `${(k - 4).toFixed(0)}px`),
            (E.style.width = `${(N - y + 12).toFixed(0)}px`),
            (E.style.height = `${(S - k + 8).toFixed(0)}px`));
        }),
          (e = requestAnimationFrame(d)));
      };
    return (
      d(),
      () => {
        e && cancelAnimationFrame(e);
      }
    );
  }, [h, p, a.detachZonePx, a.flipStartY, a.flipEndY]),
  c) ? (
    <div
      ref={s}
      data-section-ruler="1"
      className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden"
      aria-label="Kinetic section ruler"
    >
      {ed.map((e, r) => {
        let { chars: a } = h[r];
        return (
          <div key={e.id}>
            <button
              ref={(e) => {
                i.current[r] = e;
              }}
              type="button"
              aria-label={`Jump to ${e.label}`}
              onClick={() => x(e.id)}
              onMouseEnter={() => m(r)}
              onMouseLeave={() => m(null)}
              className="pointer-events-auto absolute cursor-pointer bg-transparent border-0 outline-none z-10"
              style={{
                left: 0,
                top: 0,
                width: 0,
                height: 0,
              }}
            />
            {a.map((a, s) => (
              <span
                key={`${e.id}-${s}`}
                ref={(e) => {
                  n.current[`${r}-${s}`] = e;
                }}
                aria-hidden="true"
                className="font-mono absolute top-0 left-0 whitespace-pre pointer-events-none font-black uppercase text-white will-change-transform tracking-tight drop-shadow-sm"
                style={{
                  fontSize: "48px",
                  lineHeight: 1,
                  opacity: 0,
                  transformOrigin: "center center",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        );
      })}
      <div className="absolute right-3 sm:right-4 md:right-5 top-8 bottom-8 w-16 pointer-events-none select-none">
        <div className="absolute top-0 bottom-0 right-2 w-px bg-white/20" />
        {[0, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 1].map((e) => {
          let r = 0 === e || 0.25 === e || 0.5 === e || 0.75 === e || 1 === e;
          return (
            <div
              key={e}
              className={`absolute right-2 ${r ? "w-2.5 sm:w-3 bg-white/50" : "w-1.5 sm:w-2 bg-white/30"} h-px`}
              style={{
                top: `${100 * e}%`,
              }}
            />
          );
        })}
        <div
          ref={l}
          className="absolute right-2 -translate-y-1/2 flex items-center gap-1.5 will-change-transform"
          style={{
            top: "0%",
          }}
        >
          <span
            ref={o}
            className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-widest text-white whitespace-nowrap tabular-nums"
          >
            000%
          </span>
          <div className="w-3 sm:w-3.5 h-[2px] bg-white shadow-[0_0_8px_#ffffff]" />
        </div>
      </div>
    </div>
  ) : null;
}
function ExperienceShell({ children: e }) {
  let a = useRef(null),
    s = useRef(null);
  return (
    W(() => {
      a.current &&
        s.current &&
        gsap.fromTo(
          s.current,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: a.current,
              start: "top 86%",
              toggleActions: "play none none none",
              once: true,
              fastScrollEnd: true,
              invalidateOnRefresh: true,
            },
          },
        );
    }, []),
    (
      <div ref={a} className="relative w-full">
        <div ref={s} className="w-full min-h-0">
          {e}
        </div>
      </div>
    )
  );
}
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-transparent text-foreground">
      <SceneBackground />
      <SectionRuler />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ExperienceShell>
        <Experience />
      </ExperienceShell>
      <Contact />
      <Footer />
    </main>
  );
}
