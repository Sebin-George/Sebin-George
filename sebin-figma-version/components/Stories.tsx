const steps = [
  {
    n: "01", title: "Empathize", sub: "Understand the users",
    icon: (<><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>),
    items: ["User Research", "Stakeholder Interviews", "User Personas", "Journey Mapping", "Pain Points"],
  },
  {
    n: "02", title: "Define", sub: "Frame the right problem",
    icon: (<><circle cx="12" cy="12" r="8" /><path d="M12 12l4-3M12 12V7" /></>),
    items: ["Problem Statement", "User Needs", "Competitive Analysis", "Information Architecture", "UX Strategy"],
  },
  {
    n: "03", title: "Ideate", sub: "Explore solutions creatively",
    icon: <path d="M13 3L5 13h6l-1 8 8-10h-6z" />,
    items: ["Brainstorming", "User Flows", "Wireframes", "Low-Fidelity", "Concept Validation"],
  },
  {
    n: "04", title: "Design", sub: "Craft intuitive interfaces",
    icon: (<><path d="M5 19l1-4L17 4l3 3L9 18z" /><path d="M4 21h8" /></>),
    items: ["High-Fidelity UI", "Design System", "Component Library", "Prototyping", "Micro Interactions"],
  },
  {
    n: "05", title: "Test", sub: "Validate and refine",
    icon: (<><rect x="6" y="5" width="12" height="16" rx="2" /><path d="M9 3h6v4H9zM9 14l2 2 4-4" /></>),
    items: ["Usability Testing", "Feedback Analysis", "Iterations", "Accessibility Check", "Performance Check"],
  },
  {
    n: "06", title: "Deliver", sub: "Launch and drive impact",
    icon: (<><path d="M12 4l9 16H3z" /><path d="M12 10v4M12 17v.5" /></>),
    items: ["Developer Handoff", "Design Documentation", "QA & Support", "Monitor & Improve", "Continuous Iteration"],
  },
];

export default function Stories() {
  return (
    <section className="stories" id="workflow">
      <div className="wrap">
        <p className="eyebrow">-(UX/UI WORKFLOW)-</p>
        <div className="head-row">
          <h2 className="big">Design <span className="o">Stories</span></h2>
          <p className="serif">A human-centered process that turns ideas into meaningful digital experiences.</p>
        </div>
        <p className="muted lead">
          I follow a structured yet flexible workflow that blends research, strategy, design, and testing to create
          intuitive, accessible, and impactful products.
        </p>

        <div className="steps">
          {steps.map((s) => (
            <div className="step" key={s.n}>
              <i className="ic"><svg viewBox="0 0 24 24">{s.icon}</svg></i>
              <em>{s.n}</em>
              <h3>{s.title}</h3>
              <p>{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="timeline">
          {[18, 34, 51, 67, 83].map((l) => (<span key={l} style={{ left: `${l}%` }} />))}
          <span className="hollow" style={{ left: "99%" }} />
        </div>

        <div className="lists">
          {steps.map((s) => (
            <ul key={s.n}>{s.items.map((i) => (<li key={i}>{i}</li>))}</ul>
          ))}
        </div>
      </div>
    </section>
  );
}
