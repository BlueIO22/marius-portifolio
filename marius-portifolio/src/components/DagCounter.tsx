"use client";

import { useEffect, useRef, useState } from "react";

function computeDays(): number {
  const summer = new Date(2026, 5, 24); // June 24 2026, midnight local
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ms = today.getTime() - summer.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const HIGHLIGHTS = [181];

export default function DagCounter() {
  const target = computeDays();
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const duration = 1800;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBg = html.style.backgroundColor;
    const prevBodyBg = body.style.backgroundColor;
    html.style.backgroundColor = "#e0f2fe";
    body.style.backgroundColor = "#e0f2fe";
    return () => {
      html.style.backgroundColor = prevHtmlBg;
      body.style.backgroundColor = prevBodyBg;
    };
  }, []);

  useEffect(() => {
    function tick(now: number) {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayed(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#38bdf8_0%,#bae6fd_45%,#fef9c3_100%)]">
      {/* Sun glow */}
      <div
        className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-[clamp(120px,30vw,260px)] h-[clamp(120px,30vw,260px)] rounded-full bg-[radial-gradient(circle,#fde68a_0%,#fbbf24_40%,transparent_70%)] opacity-70 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Highlights panel — top-right desktop, bottom-center mobile */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 sm:bottom-auto sm:top-6 sm:right-6 sm:left-auto sm:translate-x-0 flex flex-row sm:flex-col gap-2 sm:gap-1.5 px-4 py-2 sm:px-3 sm:py-3 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/50 shadow-sm pointer-events-none select-none">
        {HIGHLIGHTS.map((n, i) => (
          <span
            key={i}
            className="text-[clamp(0.75rem,2vw,0.9rem)] font-black text-[#0c4a6e] tracking-tight leading-none sm:text-right"
          >
            {n.toLocaleString()}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-8 select-none">
        {/* Sun icon */}
        <div
          className="text-[#f59e0b] drop-shadow-[0_0_16px_#fbbf2480] mb-[clamp(1rem,3vw,2rem)] w-[clamp(48px,8vw,72px)] h-[clamp(48px,8vw,72px)]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="13" fill="currentColor" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <line
                key={i}
                x1="32"
                y1="8"
                x2="32"
                y2="14"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${deg} 32 32)`}
              />
            ))}
          </svg>
        </div>

        <p className="uppercase tracking-[0.25em] text-[#0c4a6e] text-[clamp(0.7rem,2.5vw,1rem)] mb-[clamp(1rem,4vw,2.5rem)] font-semibold">
          Hvor mange dager
        </p>

        {/* Number */}
        <div className="relative flex items-center justify-center">
          <span
            className="[font-family:'Archivo_Black'] text-[clamp(5rem,22vw,14rem)] leading-none font-black bg-[linear-gradient(160deg,#fed7aa_10%,#f97316_45%,#c2410c_80%)] bg-clip-text text-transparent drop-shadow-[0_4px_24px_#f9731640] relative z-[1] tracking-[-0.02em]"
            aria-live="polite"
            aria-label={`${displayed} dager`}
          >
            {displayed}
          </span>
          <div
            className="absolute w-[120%] h-[120%] rounded-full bg-[radial-gradient(ellipse,#fbbf2422_0%,transparent_70%)] pointer-events-none"
            aria-hidden="true"
          />
        </div>

        <p className="[font-family:'Archivo_Black'] text-[clamp(1.4rem,5vw,2.8rem)] tracking-[0.18em] uppercase text-[#f97316] mt-[clamp(-0.2rem,-1vw,-0.5rem)] opacity-90">
          dager
        </p>

        <div
          className="w-[clamp(60px,20vw,120px)] h-px bg-[linear-gradient(90deg,transparent,#7dd3fc,transparent)] my-[clamp(1.2rem,3vw,2rem)]"
          aria-hidden="true"
        />

        <p className="uppercase tracking-[0.15em] text-[#0c4a6e] text-[clamp(0.85rem,2.8vw,1.15rem)] mb-[0.4rem] font-semibold">
          siden sommer 2026
        </p>
        <p className="text-[#0369a1] text-[clamp(0.7rem,2vw,0.85rem)] tracking-[0.08em]">
          24. juni 2026
        </p>
      </div>
    </div>
  );
}
