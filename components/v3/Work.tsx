import { PROJECTS } from "@/lib/data";
import StackDots from "@/components/v3/StackDots";
import WorkScroll from "@/components/v3/WorkScroll";

export default function Work() {
  return (
    <section className="section" id="work">
      <header className="section-head" data-reveal>
        <p className="eyebrow">( Selected work )</p>
        <h2>
          Products designed to solve <span className="serif accent">real problems</span>.
        </h2>
      </header>

      <div className="stack">
        {PROJECTS.map((p, i) => (
          <article className="proj" key={p.title} style={{ ["--n" as string]: i }}>
            <div className="proj-copy">
              <div className="proj-top">
                <span className="proj-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="proj-year">{p.year}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="proj-kind">{p.kind}</p>
              <p className="proj-desc">{p.desc}</p>
              <ul className="proj-points">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="proj-foot">
                <p className="proj-role">{p.role}</p>
                <ul className="tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {p.href && (
                  <a className="btn btn-ink proj-link" href={p.href} target="_blank" rel="noreferrer">
                    {(p.hrefLabel ?? "View case study").replace(/ on Behance$/, "")}<span className="on-b"> on Behance</span> <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </div>
            {p.href ? (
              <a className={`proj-media ${p.landscape ? "is-wide" : ""}`} data-tilt href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.title}: open case study on Behance`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={`${p.title}: ${p.kind}`} width={p.w} height={p.h} loading="lazy" decoding="async" />
                <span className="proj-open">Behance ↗</span>
              </a>
            ) : (
              <div className={`proj-media ${p.landscape ? "is-wide" : ""}`} data-tilt>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={`${p.title}: ${p.kind}`} width={p.w} height={p.h} loading="lazy" decoding="async" />
              </div>
            )}
          </article>
        ))}
      </div>
      <StackDots count={PROJECTS.length} />
      <WorkScroll />
    </section>
  );
}
