import { TOOLS } from "@/lib/data";

export default function Marquee() {
  const row = [...TOOLS, ...TOOLS];
  return (
    <div className="marquee" aria-label="Tools I work with">
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <ul key={n} aria-hidden={n === 1}>
            {row.map((t, i) => (
              <li key={`${n}-${i}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/assets/logos/${t.logo}.png`} alt="" width={30} height={30} loading="lazy" decoding="async" />
                <span>{t.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
