export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap">
        <p className="hero-role">UI/UX &amp; PRODUCT DESIGNER</p>
        <img className="hero-brain" src="/assets/img/brain.png" alt="" />
        <h1 className="hero-title">
          <span className="ind">
            Designing <span className="o">Digital</span>
          </span>
          <br />
          <span className="o">Products</span> that people
          <br />
          love to use.
        </h1>
        <p className="hero-sub">Turning ideas into clean, intuitive, and engaging digital experiences.</p>
        <div className="hero-btns">
          <a className="btn-pill btn-orange" href="#work">&rarr; VIEW CASE STUDIES</a>
          <a className="btn-pill btn-white" href="#workflow">&rarr; VIEW SERVICES</a>
        </div>
        <div className="center">
          <a className="btn-small" href="#" download>
            Download Resume <span>&#8599;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
