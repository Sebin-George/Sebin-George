"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <a className="nav-brand" href="#top" aria-label="Sebin George, home">
        <span className="nav-dot" />
        Sebin George
      </a>
      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a className="nav-mobile-only" href="#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
      </nav>
      <a className="btn btn-ink nav-cta" href="#contact" onClick={() => setOpen(false)}>
        Let&rsquo;s talk <span aria-hidden>↗</span>
      </a>
      <button className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span />
        <span />
      </button>
    </header>
  );
}
