const WORDS = ["web apps", "SaaS dashboards", "mobile apps", "websites", "brands"];

const NOW = [
  { k: "Now", v: "UI/UX Designer · Freelance" },
  { k: "Latest", v: "VELTRIX · sneaker e-commerce" },
  { k: "Open to", v: "Full-time · Freelance · Collabs" },
  { k: "Works in", v: "Figma · Photoshop · HTML/CSS" },
];

// Headline with a cycling word ("Designing [web apps | SaaS dashboards | ...] people love"), plus a quiet "right now" list.
export default function HeroTitle() {
  let n = 0;
  const word = (t: string, accent = false) => (
    <span className="word">
      <span className={`word-in ${accent ? "serif accent" : ""}`} style={{ ["--i" as string]: n++ }}>
        {t}
      </span>
    </span>
  );
  return (
    <div className="hl">
      <h1 className="hero-title hl-base" aria-label="Designing web apps, SaaS dashboards, mobile apps, websites and brands people love.">
        <span aria-hidden>
          <span className="line">{word("Designing")}</span>
          <span className="line cyc-line">
            <span className="word cyc">
              {WORDS.map((w, i) => (
                <span className="cyc-w" key={w} style={{ ["--k" as string]: i }}>
                  {w}
                </span>
              ))}
            </span>
          </span>
          <span className="line">
            {word("people")} {word("love.", true)}
          </span>
        </span>
      </h1>

      <ul className="now hero-in" style={{ ["--d" as string]: "0.9s" }}>
        {NOW.map((r) => (
          <li key={r.k}>
            <span>{r.k}</span>
            <b>{r.v}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
