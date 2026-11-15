"use client";

// Page background: three soft colour glows that drift slowly (CSS transforms only, no scroll listener, no layout work).
export default function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <i className="orb orb-a" />
      <i className="orb orb-b" />
      <i className="orb orb-c" />
    </div>
  );
}
