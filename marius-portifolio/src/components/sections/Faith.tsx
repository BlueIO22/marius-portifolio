"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Cross dimensions
const W = 200;   // horizontal bar width
const H = 340;   // vertical bar height
const T = 56;    // bar thickness (both bars)
const HY = 88;   // vertical position of horizontal bar top
const OFF = 14;  // shadow offset

// SVG canvas includes the offset
const SVG_W = W + OFF;
const SVG_H = H + OFF;

// Vertical bar: centred horizontally
const VX = (W - T) / 2;   // = 72

export function Faith() {
  return (
    <section className="bg-[#f8fffe] py-36 px-6 overflow-hidden border-t border-slate-100">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <span className="section-label">Tru &amp; teknologi</span>
          <h2
            className="font-black text-[#0c1117] mt-4 leading-tight"
            style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}
          >
            Teknologi i <span className="gradient-text">Guds</span> teneste
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">

          {/* Cross — SVG with offset shadow */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex justify-center lg:justify-start"
          >
            <svg
              width={SVG_W}
              height={SVG_H}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Kross"
            >
              {/* Teal shadow cross — offset down-right */}
              <g transform={`translate(${OFF}, ${OFF})`} fill="#0d9488">
                <rect x={VX} y={0}  width={T} height={H} />
                <rect x={0}  y={HY} width={W} height={T} />
              </g>

              {/* Main cross — dark, sits on top */}
              <g fill="#0c1117">
                <rect x={VX} y={0}  width={T} height={H} />
                <rect x={0}  y={HY} width={W} height={T} />
              </g>
            </svg>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            className="space-y-6"
          >
            {[
              {
                text: "Eg trur at teknologi kan tena eit ekte formål i Guds verd — ikkje berre som eit verktøy for forretning eller underhaldning, men som eit middel til å lysa opp og byggja fellesskap.",
                style: "text-slate-600",
              },
              {
                text: "Gjennom det eg er best til — webutvikling og digitale løysingar — arbeider eg for å spreie evangeliet og auka kunnskapen om lutheranismen. Det kan vera ein podcast-plattform, ei nettside for ei kyrkjelyd, eller ein app som gjer det lettare å lesa Bibelen og forstå luthersk teologi.",
                style: "text-slate-600",
              },
              {
                text: "Eg ser på kvar kodelinje som ein moglegheit til å tena noko større enn meg sjølv.",
                style: "font-semibold text-teal-700",
              },
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: EASE }}
                className={`leading-relaxed text-[1.05rem] ${p.style}`}
              >
                {p.text}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
