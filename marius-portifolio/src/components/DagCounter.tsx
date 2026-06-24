"use client";

import { useEffect, useRef, useState } from "react";

function computeDays(): number {
  const christmas = new Date(2026, 6, 24); // Jan 24 2026, midnight local
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ms = today.getTime() - christmas.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)) + 1);
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

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
    html.style.backgroundColor = "#020308";
    body.style.backgroundColor = "#020308";
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
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#1a1f4e_0%,#0b0d24_55%,#020308_100%)]">
      {/* Starfield */}
      <div
        className="stars-small absolute inset-0 pointer-events-none opacity-70 animate-twinkle-3"
        aria-hidden="true"
      />
      <div
        className="stars-medium absolute inset-0 pointer-events-none opacity-80 animate-twinkle-5"
        aria-hidden="true"
      />
      <div
        className="stars-large absolute inset-0 pointer-events-none opacity-90 animate-twinkle-7"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-8 select-none">
        {/* Star icon */}
        <div
          className="text-[#f5c842] drop-shadow-[0_0_12px_#f5c84280] animate-rotate-star mb-[clamp(1rem,3vw,2rem)] w-[clamp(48px,8vw,72px)] h-[clamp(48px,8vw,72px)]"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32 4 L34.5 28 L58 32 L34.5 36 L32 60 L29.5 36 L6 32 L29.5 28 Z"
              fill="currentColor"
            />
            <path
              d="M32 14 L33.2 29 L48 32 L33.2 35 L32 50 L30.8 35 L16 32 L30.8 29 Z"
              fill="currentColor"
              opacity="0.4"
            />
          </svg>
        </div>

        <p className="uppercase tracking-[0.25em] text-[#9ba8cc] text-[clamp(0.7rem,2.5vw,1rem)] mb-[clamp(1rem,4vw,2.5rem)]">
          Hvor mange dager
        </p>

        {/* Number */}
        <div className="relative flex items-center justify-center">
          <span
            className="[font-family:'Archivo_Black'] text-[clamp(5rem,22vw,14rem)] leading-none font-black bg-[linear-gradient(160deg,#ffe9a0_10%,#f5c842_45%,#e8960a_80%)] bg-clip-text text-transparent drop-shadow-[0_0_40px_#f5c84260] relative z-[1] tracking-[-0.02em]"
            aria-live="polite"
            aria-label={`${displayed} dager`}
          >
            {displayed}
          </span>
          <div
            className="absolute w-[120%] h-[120%] rounded-full bg-[radial-gradient(ellipse,#f5c84218_0%,transparent_70%)] animate-pulse-glow pointer-events-none"
            aria-hidden="true"
          />
        </div>

        <p className="[font-family:'Archivo_Black'] text-[clamp(1.4rem,5vw,2.8rem)] tracking-[0.18em] uppercase text-[#f5c842] mt-[clamp(-0.2rem,-1vw,-0.5rem)] opacity-90">
          dager
        </p>

        <div
          className="w-[clamp(60px,20vw,120px)] h-px bg-[linear-gradient(90deg,transparent,#f5c84260,transparent)] my-[clamp(1.2rem,3vw,2rem)]"
          aria-hidden="true"
        />

        <p className="uppercase tracking-[0.15em] text-[#c8d0e8] text-[clamp(0.85rem,2.8vw,1.15rem)] mb-[0.4rem]">
          siden jul 2025
        </p>
        <p className="text-[#5a6282] text-[clamp(0.7rem,2vw,0.85rem)] tracking-[0.08em]">
          25. desember 2025
        </p>
      </div>

      {/* Stars background-images — kept here as they are multi-stop radial-gradient lists */}
      <style>{`
        .stars-small  { background-image: radial-gradient(1px 1px at 10% 15%, #fff 0, transparent 100%), radial-gradient(1px 1px at 30% 70%, #fff 0, transparent 100%), radial-gradient(1px 1px at 55% 25%, #fff 0, transparent 100%), radial-gradient(1px 1px at 70% 80%, #fff 0, transparent 100%), radial-gradient(1px 1px at 85% 45%, #fff 0, transparent 100%), radial-gradient(1px 1px at 20% 90%, #fff 0, transparent 100%), radial-gradient(1px 1px at 92% 10%, #fff 0, transparent 100%), radial-gradient(1px 1px at 48% 60%, #fff 0, transparent 100%), radial-gradient(1px 1px at 65% 5%, #fff 0, transparent 100%), radial-gradient(1px 1px at 3% 50%, #fff 0, transparent 100%), radial-gradient(1px 1px at 77% 33%, #fff 0, transparent 100%), radial-gradient(1px 1px at 40% 42%, #fff 0, transparent 100%); }
        .stars-medium { background-image: radial-gradient(1.5px 1.5px at 22% 8%, #ffe9b0 0, transparent 100%), radial-gradient(1.5px 1.5px at 60% 88%, #ffe9b0 0, transparent 100%), radial-gradient(1.5px 1.5px at 80% 60%, #ffe9b0 0, transparent 100%), radial-gradient(1.5px 1.5px at 15% 55%, #ffe9b0 0, transparent 100%), radial-gradient(1.5px 1.5px at 95% 75%, #ffe9b0 0, transparent 100%), radial-gradient(1.5px 1.5px at 50% 95%, #ffe9b0 0, transparent 100%); }
        .stars-large  { background-image: radial-gradient(2px 2px at 38% 18%, #fff8e0 0, transparent 100%), radial-gradient(2px 2px at 72% 28%, #fff8e0 0, transparent 100%), radial-gradient(2px 2px at 88% 88%, #fff8e0 0, transparent 100%), radial-gradient(2px 2px at 8% 82%, #fff8e0 0, transparent 100%); }
      `}</style>
    </div>
  );
}
