"use client";

import { FormEvent, PointerEvent, useState } from "react";
import { PROFILE } from "@/lib/data";

const NEEDS = ["a website", "a web app", "a mobile app", "a SaaS dashboard", "branding", "a redesign"];

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

export default function Contact() {
  const [need, setNeed] = useState(NEEDS[0]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  // No server: opens the visitor's own email app with the sentence filled in.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "");
    const email = String(f.get("email") || "");
    const note = String(f.get("note") || "");
    const subject = encodeURIComponent(`Hi Sebin, ${name} here`);
    const body = encodeURIComponent(`Hi Sebin,\n\nI'm ${name}. I need ${need}.${note ? `\n\n${note}` : ""}\n\nYou can reach me at ${email}.`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  // spotlight that follows the pointer across each card
  const glow = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section className="ct" id="contact">
      <div className="ct-inner">
        <header className="ct-head" data-reveal>
          <div className="ct-who">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/portrait.webp" alt="" width={56} height={56} loading="lazy" decoding="async" />
            <span className="ct-live">
              <i className="pulse" /> Available for new projects
            </span>
          </div>
          <h2 className="ct-title">
            Let&rsquo;s build something
            <br />
            people <span className="serif">love</span>.
          </h2>
        </header>

        <div className="ct-grid">
          <form className="ct-card ct-sentence" onSubmit={submit} onPointerMove={glow} data-reveal>
            <p className="ct-lead">Tell me about your project</p>
            <p className="ct-line">
              Hi Sebin, I&rsquo;m <input name="name" required placeholder="your name" aria-label="Your name" autoComplete="name" />. I need{" "}
              <select value={need} onChange={(e) => setNeed(e.target.value)} aria-label="What you need">
                {NEEDS.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              . You can reach me at <input name="email" type="email" required placeholder="you@email.com" aria-label="Your email" autoComplete="email" />.
            </p>
            <input className="ct-note-in" name="note" placeholder="Anything else I should know? (optional)" aria-label="Optional note" />
            <div className="ct-send-row">
              <button className="ct-go" type="submit">
                <span>Send it</span>
                <i aria-hidden>↗</i>
              </button>
              <small>Opens your email app with the message filled in.</small>
            </div>
          </form>

          <div className="ct-side">
            <button type="button" className="ct-card ct-tile" onClick={copy} onPointerMove={glow} data-reveal style={{ ["--d" as string]: "0.08s" }}>
              <span className="ct-ico"><Icon d="M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" /></span>
              <span className="ct-tt">
                <em>{copied ? "Copied to clipboard ✓" : "Email · click to copy"}</em>
                <b>{PROFILE.email}</b>
              </span>
            </button>
            <a className="ct-card ct-tile" href={PROFILE.phoneHref} onPointerMove={glow} data-reveal style={{ ["--d" as string]: "0.14s" }}>
              <span className="ct-ico"><Icon d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></span>
              <span className="ct-tt">
                <em>Call</em>
                <b>{PROFILE.phone}</b>
              </span>
            </a>
            <a className="ct-card ct-tile" href={PROFILE.behance} target="_blank" rel="noreferrer" onPointerMove={glow} data-reveal style={{ ["--d" as string]: "0.2s" }}>
              <span className="ct-ico"><Icon d="M4 6h6a3 3 0 010 6H4zM4 12h7a3 3 0 010 6H4zM14 9h6M14.5 15a3 3 0 006 .5h-6a3 3 0 116-.5" /></span>
              <span className="ct-tt">
                <em>Behance</em>
                <b>sebingeorge1</b>
              </span>
              <span className="ct-out" aria-hidden>↗</span>
            </a>
            <a className="ct-card ct-tile" href={PROFILE.linkedin} target="_blank" rel="noreferrer" onPointerMove={glow} data-reveal style={{ ["--d" as string]: "0.26s" }}>
              <span className="ct-ico"><Icon d="M6 9v10M6 5v.5M11 19v-6a3 3 0 016 0v6M11 9v10" /></span>
              <span className="ct-tt">
                <em>LinkedIn</em>
                <b>sebingeorgevattappallil</b>
              </span>
              <span className="ct-out" aria-hidden>↗</span>
            </a>
            <a className="ct-card ct-tile" href={PROFILE.github} target="_blank" rel="noreferrer" onPointerMove={glow} data-reveal style={{ ["--d" as string]: "0.32s" }}>
              <span className="ct-ico"><Icon d="M9 19c-4 1.3-4-2-6-2.5m12 4.5v-3.2a2.8 2.8 0 00-.8-2.2c2.700-.3 5.500-1.300 5.500-6a4.600 4.600 0 00-1.300-3.200 4.300 4.300 0 00-.1-3.200s-1-.3-3.300 1.300a11.500 11.500 0 00-6 0C6.800 2.800 5.800 3.100 5.800 3.100a4.300 4.300 0 00-.1 3.200A4.600 4.600 0 004.400 9.500c0 4.600 2.800 5.700 5.500 6a2.800 2.800 0 00-.8 2.200V21" /></span>
              <span className="ct-tt">
                <em>GitHub</em>
                <b>Sebin-George</b>
              </span>
              <span className="ct-out" aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <ul className="ct-facts" data-reveal>
          <li><b>Kochi</b><span>Kerala, India</span></li>
          <li><b>&lt; 24 h</b><span>Typical reply time</span></li>
          <li><b>Open to</b><span>Full-time · Freelance · Collaborations</span></li>
        </ul>
      </div>

      <footer className="ct-foot">
        <p>© 2026 {PROFILE.name}</p>
        <p>UI/UX &amp; Graphic Designer</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
