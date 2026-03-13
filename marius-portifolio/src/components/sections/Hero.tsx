"use client";

import { motion } from "framer-motion";
import { SiteContent } from "@/data/content";

interface HeroProps {
  data: SiteContent["hero"];
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]; // expo out — very snappy

function goto(href: string) {
  document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
}

// Each word of the name drops in with a slight skew — feels hand-crafted
function BigName({ name }: { name: string }) {
  const words = name.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, skewY: 4 }}
          animate={{ opacity: 1, y: 0, skewY: 0 }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.14, ease: EASE }}
          className="block leading-[0.9] tracking-tight"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

export function Hero({ data }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Static decorative shapes — no filter, no animation = zero scroll lag */}
      <div className="absolute right-0 top-0 w-[480px] h-[480px] rounded-bl-[120px] bg-teal-50 -z-0" />
      <div className="absolute right-20 top-20 w-64 h-64 rounded-full border-[20px] border-teal-100 -z-0 animate-float" />
      <div className="absolute left-8 bottom-16 w-24 h-24 rounded-full bg-orange-100/60 -z-0" />
      <div className="absolute left-[15%] top-[18%] w-4 h-4 rounded-full bg-teal-400 -z-0" />
      <div className="absolute right-[12%] bottom-[25%] w-6 h-6 rounded-full bg-orange-300/70 -z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-28 lg:py-36">
        <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-center">

          {/* Left: typography block */}
          <div>
            {/* Role tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-8"
            >
              <span className="section-label">{data.title}</span>
            </motion.div>

            {/* Giant name */}
            <h1
              className="font-black text-[#0c1117] mb-8"
              style={{ fontSize: "clamp(3.75rem, 9.5vw, 8.5rem)" }}
            >
              <BigName name={data.name} />
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="text-slate-500 text-lg leading-relaxed max-w-md mb-10"
            >
              {data.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              <button className="btn-primary" onClick={() => goto(data.ctaLink)}>
                {data.ctaText} →
              </button>
              {data.secondaryCtaText && (
                <button
                  className="btn-ghost"
                  onClick={() => goto(data.secondaryCtaLink ?? "#kontakt")}
                >
                  {data.secondaryCtaText}
                </button>
              )}
            </motion.div>
          </div>

          {/* Right: decorative card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Background card */}
              <div className="absolute inset-0 bg-teal-500 rounded-3xl translate-x-3 translate-y-3" />
              {/* Foreground card */}
              <div className="relative bg-[#0c1117] rounded-3xl p-8 text-white">
                <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
                  Om meg
                </p>
                <p className="text-2xl font-black leading-snug mb-6">
                  Eg lagar ting på nett som folk faktisk likar å bruka.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Sanity"].map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-10 left-6 flex items-center gap-2 text-slate-400 text-sm font-semibold"
        >
          <span className="animate-bounce-slow inline-block">↓</span>
          <span>Rull ned</span>
        </motion.div>
      </div>
    </section>
  );
}
