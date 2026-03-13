"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Divider() {
  return (
    <div className="w-full overflow-hidden leading-none" style={{ height: 220 }} aria-hidden>
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#99f6e4" />
            <stop offset="40%"  stopColor="#0d9488" />
            <stop offset="70%"  stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#99f6e4" />
          </linearGradient>
        </defs>

        {/* Back wave */}
        <motion.path
          d="M0,130 C180,52 360,188 540,110 C720,32 900,172 1080,98 C1260,24 1380,148 1440,90"
          stroke="#e0faf5"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, delay: 0.15, ease: EASE }}
        />

        {/* Main wave */}
        <motion.path
          d="M0,110 C180,32 360,172 540,90 C720,12 900,158 1080,78 C1260,12 1380,130 1440,72"
          stroke="url(#wave-grad)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </svg>
    </div>
  );
}
