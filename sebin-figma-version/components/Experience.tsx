const jobs = [
  {
    date: "Jan 2026- Present",
    company: "Freelance",
    desc: "Designed digital products for personal, portfolio, and client projects, including websites, mobile apps, SaaS dashboards, e-commerce platforms, and branding. Delivered complete design solutions from research and wireframes to high-fidelity UI, prototypes, and developer handoff.",
    items: [
      "Product Discovery & UX Research", "User Flow & Information Architecture", "Wireframing & Interactive Prototyping",
      "UI Design for Web & Mobile", "Design Systems & Component Libraries", "Responsive Design",
      "Branding & Visual Identity", "Client Communication & Requirement Gathering", "Developer Handoff",
    ],
  },
  {
    date: "Mar 2025- Jan 2026",
    company: "Techrish Solutions, Kochi",
    desc: "Designed intuitive web and mobile interfaces, SaaS products, dashboards, and marketing websites while contributing to the company's visual identity through branding and social media creatives. Collaborated with developers, marketers, and stakeholders to deliver consistent and engaging digital experiences.",
    items: [
      "UI/UX Design for Web & Mobile Applications", "SaaS Dashboard Design", "Wireframing & Interactive Prototyping",
      "Design Systems & Component Libraries", "Marketing Website Design", "Branding & Visual Identity",
      "Social Media Creatives & Campaign Posters", "Event & Promotional Graphics", "Developer Handoff & Design QA",
    ],
  },
  {
    date: "Feb 2024- Feb 2025",
    company: "GSTech Technologies, Bangalore",
    desc: "Worked on Flonnect and AdSpyder, designing SaaS platforms, analytics dashboards, Chrome extensions, marketing websites, and browser experiences. Conducted UX research, created wireframes and prototypes, built scalable design systems, and collaborated closely with developers to deliver intuitive, high-quality digital products.",
    items: [
      "SaaS Product Design", "Dashboard Design", "Chrome Extension UI", "UX Research", "Wireframing",
      "Prototyping", "Design Systems", "Responsive Design", "Developer Handoff",
    ],
  },
];

export default function Experience() {
  return (
    <section className="exp" id="experience">
      <div className="exp-sticky">
        <div className="wrap exp-inner">
          <div className="exp-left">
            <p className="eyebrow">-(PROFESSIONAL EXPERIENCE)-</p>
            <h2 className="big">My <span className="o">Experience</span></h2>
            <p className="muted lead">
              With 2+ years of experience in UI/UX design, I&apos;ve worked with startups and businesses to create
              intuitive digital products across web, mobile, SaaS platforms, dashboards, and browser extensions. My
              focus is on solving user problems through research, strategy, and thoughtful design.
            </p>
            <a className="btn-small" href="#" download>
              Download Resume <span>&#8599;</span>
            </a>
          </div>
          <div className="exp-right">
            <svg className="orbit" viewBox="0 0 400 520" fill="none">
              <path d="M60 60C20 150 40 320 120 360M350 120C420 250 360 420 290 470" stroke="#ff4d00" strokeWidth="2" strokeDasharray="10 12" />
            </svg>
            {jobs.map((j) => (
              <article className="card" key={j.date}>
                <small>{j.date}</small>
                <h3>UI/UX Designer</h3>
                <h4>{j.company}</h4>
                <div className="tag"><i />Full-time</div>
                <p>{j.desc}</p>
                <h5>Key Contributions</h5>
                <ul>{j.items.map((i) => (<li key={i}>{i}</li>))}</ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
