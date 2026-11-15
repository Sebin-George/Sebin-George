"use client";

import { useRef } from "react";

const projects = [
  { img: "/assets/img/project1.png", name: "MediFlow", desc: "A streamlined healthcare platform simplifying patient management, appointment scheduling, and provider interactions through intuitive digital experiences." },
  { img: "/assets/img/project2.png", name: "NEW WAY", desc: "A contemporary streetwear brand built around bold visuals, modern aesthetics, and a distinctive fashion identity." },
  { img: "/assets/img/project3.png", name: "KrishiMate", desc: "An intelligent farming platform helping farmers monitor crops, access AI-powered insights, and make smarter agricultural decisions." },
];

export default function Work() {
  const row = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => row.current?.scrollBy({ left: dir * 400, behavior: "smooth" });

  return (
    <section className="work" id="work">
      <div className="wrap wide">
        <div className="work-top">
          <p className="eyebrow">-(FEATURED WORK)-</p>
          <div className="arrows">
            <button aria-label="Previous" onClick={() => scroll(-1)}>&larr;</button>
            <button aria-label="Next" onClick={() => scroll(1)}>&rarr;</button>
          </div>
        </div>
        <img className="sphere" src="/assets/img/sphere.png" alt="" />
        <img className="swoosh" src="/assets/img/arrow.png" alt="" />
        <h2 className="big">
          Projects That <span className="o">Solve</span>
          <br />
          <span className="o">Real Problems</span>
        </h2>
        <p className="work-lead">
          A collection of web, mobile, and SaaS products designed to improve user experiences, simplify complex
          workflows, and create measurable business value.
        </p>
        <div className="cards" ref={row}>
          {projects.map((p) => (
            <a className="pcard" href="#" key={p.name}>
              <div className="pimg">
                <img src={p.img} alt={p.name} />
                <span className="chip">Mobile App</span>
              </div>
              <div className="pbody">
                <h3>{p.name}</h3>
                <i className="go">&#8599;</i>
                <p>{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="center">
          <a className="btn-small big-btn" href="#">View All Projects <span>&#8599;</span></a>
        </div>
      </div>
    </section>
  );
}
