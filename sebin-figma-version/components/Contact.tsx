"use client";

import { FormEvent, useState } from "react";

const info = [
  { label: "Email", value: "sebing403@gmail.com", href: "mailto:sebing403@gmail.com",
    icon: (<><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 8l9 6 9-6" /></>) },
  { label: "Phone", value: "6235228079", href: "tel:6235228079",
    icon: <path d="M6 3l3 5-2 2c1 3 3 5 6 6l2-2 5 3-1 3c-9 1-17-7-16-16z" /> },
  { label: "Location", value: "Kerala, India",
    icon: (<><path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>) },
];

const socials = [
  { glyph: "in", name: "LinkedIn" },
  { glyph: "Bē", name: "Behance" },
  { glyph: "◯", name: "Instagram" },
  { glyph: "⊔", name: "Dribbble" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Demo only: nothing is sent anywhere. Wire this to your own backend/email service when ready.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-top">
          <div>
            <p className="eyebrow">-(CONTACT)-</p>
            <h2 className="big">Let&rsquo;s<br /><span className="o">Work Together.</span></h2>
            <p className="muted lead">
              Have a project in mind, a job opportunity, or just want to say hi?
              <br />
              I&rsquo;d love to hear from you.
            </p>
          </div>
          <div className="open">
            <div className="open-list">
              <p>OPEN TO</p>
              <hr />
              <span>FULL-TIME</span>
              <span>FREELANCE</span>
              <span>COLLABORATIONS</span>
            </div>
            <div className="open-art">
              <a className="circle" href="#contact-form">&rarr;</a>
              <img src="/assets/img/handwritten.png" alt="Let's create something great!" />
            </div>
          </div>
        </div>

        <div className="contact-grid">
          <div>
            {info.map((i) => {
              const body = (
                <>
                  <i className="ico"><svg viewBox="0 0 24 24">{i.icon}</svg></i>
                  <div><small>{i.label}</small><b>{i.value}</b></div>
                  <u>&#8599;</u>
                </>
              );
              return i.href ? (
                <a className="info" href={i.href} key={i.label}>{body}</a>
              ) : (
                <div className="info" key={i.label}>{body}</div>
              );
            })}
            <p className="follow">FOLLOW ME</p>
            <div className="socials">
              {socials.map((s) => (
                <a href="#" key={s.name}><b>{s.glyph}</b><u>&#8599;</u><span>{s.name}</span></a>
              ))}
            </div>
          </div>

          <form className="form" id="contact-form" onSubmit={onSubmit}>
            <div className="form-head">
              <span><i className="dot" />SEND A MESSAGE</span>
              <small>I usually reply within 24 hours.</small>
            </div>
            <div className="two">
              <label className="field">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-5 15-5 16 0" /></svg>
                <input placeholder="Your Name" required />
              </label>
              <label className="field">
                <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 8l9 6 9-6" /></svg>
                <input type="email" placeholder="Your Email" required />
              </label>
            </div>
            <label className="field">
              <svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              <input placeholder="Subject" />
            </label>
            <label className="field area">
              <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="3" /><path d="M8 21l3-4" /></svg>
              <textarea placeholder="Your Message" rows={3} />
            </label>
            <div className="form-foot">
              <button className="send" type="submit">
                {sent ? "Message Ready (demo)" : "Send Message"} <span>&#8599;</span>
              </button>
              <p className="note">
                <i className="dot" />LET&rsquo;S CREATE<br />SOMETHING<br />GREAT TOGETHER.<s />
              </p>
            </div>
          </form>
        </div>
      </div>
      <footer><p>&copy; 2026 Sebin George. All rights reserved.</p></footer>
    </section>
  );
}
