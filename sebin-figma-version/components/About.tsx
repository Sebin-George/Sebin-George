const stats = [
  { n: "2+", label: "Years Experience", accent: true },
  { n: "15+", label: "Happy Clients" },
  { n: "40+", label: "Projects Designed" },
  { n: "100%", label: "User-Focused" },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <p className="eyebrow">-(ABOUT ME)-</p>
        <h2 className="about-title">
          DESIGNING PRODUCTS WITH
          <br />
          <span className="o">PURPOSE</span> AND <span className="o">PRECISION</span>.
        </h2>
        <div className="about-grid">
          <img className="portrait" src="/assets/img/portrait.png" alt="Sebin George" />
          <div>
            <p className="about-text">
              I&apos;m Sebin George, a UI/UX &amp; Product Designer with 2+ years of experience creating intuitive web
              and mobile experiences. I focus on solving real user problems through research, thoughtful design, and
              scalable design systems.
            </p>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <b className={s.accent ? "o" : undefined}>{s.n}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
