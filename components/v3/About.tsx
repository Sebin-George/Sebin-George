import { EDUCATION, LANGUAGES, PROFILE } from "@/lib/data";

export default function About() {
  return (
    <section className="section" id="about">
      <header className="section-head" data-reveal>
        <p className="eyebrow">( About )</p>
        <h2>
          A designer who cares about the <span className="serif accent">details</span> and the people using them.
        </h2>
      </header>

      <div className="bento">
        <figure className="tile tile-portrait" data-reveal data-tilt>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/portrait.webp" alt="Sebin George" width={979} height={1223} loading="lazy" decoding="async" />
          <figcaption>
            <strong>{PROFILE.name}</strong>
            <span>{PROFILE.role}</span>
          </figcaption>
        </figure>

        <div className="tile tile-bio" data-reveal style={{ ["--d" as string]: "0.08s" }}>
          <p className="big-copy">{PROFILE.summary}</p>
        </div>

        <div className="tile tile-time" data-reveal style={{ ["--d" as string]: "0.12s" }}>
          <p className="eyebrow">Based in</p>
          <p className="tile-title">Kochi, Kerala</p>
          <p className="muted">
            Local time <b data-clock>--:--</b> IST
          </p>
        </div>

        <div className="tile tile-edu" data-reveal style={{ ["--d" as string]: "0.2s" }}>
          <p className="eyebrow">Education</p>
          <p className="tile-title small">{EDUCATION.degree}</p>
          <p className="muted">
            {EDUCATION.school} · {EDUCATION.years}
          </p>
          <ul className="certs">
            {EDUCATION.certs.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="tile tile-lang" data-reveal style={{ ["--d" as string]: "0.24s" }}>
          <p className="eyebrow">Languages</p>
          <ul className="langs">
            {LANGUAGES.map((l) => (
              <li key={l.name}>
                <span>{l.name}</span>
                <em>{l.level}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
