// Pure-CSS marquee — no Framer Motion, no JS, butter smooth.
// Scroll performance: uses CSS transform only, no paint triggers.

const items = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Sanity CMS",
  "Tailwind CSS",
  "PostgreSQL",
  "Framer Motion",
  "Docker",
  "Git",
];

const dot = (
  <span className="mx-5 text-teal-400 font-black text-lg select-none" aria-hidden>
    ✦
  </span>
);

// Duplicate for seamless loop
const track = [...items, ...items];

export function Marquee() {
  return (
    <div
      className="marquee-outer border-y border-slate-100 bg-teal-50/60 py-4 select-none"
      aria-hidden
    >
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center text-sm font-semibold text-teal-800/70">
            {dot}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
