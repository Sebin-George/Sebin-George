type Tool = { logo: string; name: string; note: string };
type Group = { n: string; title: string; tags: [string, string, string]; cls: string; row?: boolean; tools: Tool[] };

const groups: Group[] = [
  {
    n: "01", title: "DESIGN TOOLS", tags: ["DESIGN", "CREATE", "VISUALIZE"], cls: "t4", row: true,
    tools: [
      { logo: "figma", name: "Figma", note: "UI/UX Design" },
      { logo: "xd", name: "Adobe XD", note: "UI/UX Design" },
      { logo: "ps", name: "Photoshop", note: "Photo Editing" },
      { logo: "ai", name: "Illustrator", note: "Graphics & Vector" },
    ],
  },
  {
    n: "02", title: "AI & CREATIVE TOOLS", tags: ["EXPLORE", "GENERATE", "ENHANCE"], cls: "t6",
    tools: [
      { logo: "chatgpt", name: "ChatGPT", note: "Ideation & Writing" },
      { logo: "gemini", name: "Gemini", note: "Research & Ideas" },
      { logo: "midjourney", name: "Midjourney", note: "Image Generation" },
      { logo: "stitch", name: "Stitch", note: "UI Generation" },
      { logo: "claude", name: "Claude", note: "Writing & Analysis" },
      { logo: "antigravity", name: "Antigravity", note: "AI Development" },
    ],
  },
  {
    n: "03", title: "DEVELOPMENT & TECH", tags: ["BUILD", "DEVELOP", "DEPLOY"], cls: "t5",
    tools: [
      { logo: "html5", name: "HTML5", note: "Web Development" },
      { logo: "css3", name: "CSS3", note: "Styling & Layout" },
      { logo: "bootstrap", name: "Bootstrap", note: "UI Framework" },
      { logo: "js", name: "JavaScript", note: "Interactivity" },
      { logo: "jquery", name: "jQuery", note: "DOM Manipulation" },
    ],
  },
];

export default function Tools() {
  return (
    <section className="tools" id="tools">
      <div className="wrap">
        <p className="eyebrow">-(SKILLS &amp; TOOLS)-</p>
        <div className="head-row">
          <h2 className="big">Tools I <span className="o">Work With</span></h2>
          <p className="serif">Designing with creativity. Building with technology.</p>
        </div>
        <p className="muted lead">
          I combine UI/UX design principles, creative tools, and AI-powered workflows to transform ideas into
          intuitive, accessible, and visually engaging digital experiences.
        </p>
      </div>
      <div className="tool-panel">
        {groups.map((g) => (
          <div className="tgroup" key={g.n}>
            <header>
              <b>{g.n}</b>
              <i />
              <span>{g.title}</span>
              <em>
                {g.tags[0]} <u /> {g.tags[1]} <u /> {g.tags[2]} <strong>&#8599;</strong>
              </em>
            </header>
            <div className={`trow ${g.cls}`}>
              {g.tools.map((t) => (
                <div className={g.row ? "tool row" : "tool"} key={t.name}>
                  <img src={`/assets/logos/${t.logo}.png`} alt="" />
                  {g.row ? (
                    <div><h4>{t.name}</h4><p>{t.note}</p></div>
                  ) : (
                    <>
                      <h4>{t.name}</h4>
                      <p>{t.note}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
