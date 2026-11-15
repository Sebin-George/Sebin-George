import { PROFILE, STATS } from "@/lib/data";
import HeroTitle from "@/components/v3/HeroTitle";

export default function Hero() {
  return (
    <section className="hero hero-solo" id="top">
      <div className="hero-copy">
        <p className="badge hero-in" style={{ ["--d" as string]: "0.05s" }}>
          <i className="pulse" /> Available for new projects · {PROFILE.location}
        </p>

        <HeroTitle />

        {/* phone-only layout pieces (hidden on larger screens) */}
        <p className="hm-lede hero-in" style={{ ["--d" as string]: "0.55s" }}>
          I turn business requirements into clear, attractive and responsive interfaces.
        </p>
        <div className="hm-card hero-in" style={{ ["--d" as string]: "0.7s" }}>
          <span className="hm-avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/img/portrait.webp" alt="" width={56} height={56} decoding="async" />
          </span>
          <span className="hm-who">
            <b>{PROFILE.name}</b>
            <em>UI/UX · Product · Graphic designer</em>
          </span>
          <span className="hm-live">
            <i className="pulse" /> Open
          </span>
        </div>

        <div className="hero-row">
          <div className="hero-row-l">
            <p className="hero-lede hero-in" style={{ ["--d" as string]: "0.7s" }}>
              I&rsquo;m <strong>{PROFILE.name}</strong>, a UI/UX and graphic designer. I turn business requirements into clear,
              attractive and responsive interfaces: websites, web apps, SaaS dashboards, e-commerce and mobile apps.
            </p>
            <div className="hero-cta hero-in" style={{ ["--d" as string]: "0.85s" }}>
              <a className="btn btn-ink" href="#work">
                View selected work <span aria-hidden>↓</span>
              </a>
              <a className="btn btn-line" href={PROFILE.resume} download>
                Download résumé <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
          <dl className="hero-stats hero-in" style={{ ["--d" as string]: "1s" }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <dt>
                  <span data-count={s.value}>0</span>
                  {s.suffix}
                </dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <a className="hm-cue hero-in" href="#work" style={{ ["--d" as string]: "1.2s" }} aria-label="Scroll to selected work">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  );
}
