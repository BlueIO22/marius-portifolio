"use client";

import { SiteContent } from "@/data/content";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AboutProps {
  data: SiteContent["about"];
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stats = [
  { value: 3, suffix: "+", label: "År med røynsle" },
  { value: 20, suffix: "+", label: "Prosjekt leverte" },
  { value: 15, suffix: "+", label: "Teknologiar" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1100;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <strong ref={ref} className="block text-4xl font-black text-[#0c1117]">
      {n}
      {suffix}
    </strong>
  );
}

export function About({ data }: AboutProps) {
  const paras = data.bio.split("\n\n");

  return (
    <section id="om-meg" className="bg-white py-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <span className="section-label">Bli kjend med meg</span>
          <h2
            className="font-black text-[#0c1117] mt-4 leading-tight"
            style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}
          >
            Om <span className="gradient-text">meg</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left: photo + stats + LinkedIn */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex flex-col gap-8"
          >
            {/* Photo */}
            <div className="relative rounded-full self-start pr-4 pb-4">
              {/* Offset shadow block */}
              <div className="absolute top-4 left-4 right-0 bottom-0 bg-teal-400 rounded-full" />
              <img
                src={data.image}
                alt="Marius Sørenes"
                width={400}
                height={400}
                className="relative rounded-full w-96 h-96 object-cover "
              />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
                  className="card-base p-4 text-center"
                >
                  <CountUp target={s.value} suffix={s.suffix} />
                  <p className="text-slate-500 text-xs mt-1 leading-snug">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* LinkedIn */}
            <motion.a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 self-start font-bold text-sm text-white bg-[#0A66C2] px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              <LinkedInLogoIcon className="w-4 h-4" />
              Koble til på LinkedIn
            </motion.a>
          </motion.div>

          {/* Right: bio + tags */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
          >
            <div className="space-y-5 mb-10">
              {paras.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.1,
                    ease: EASE,
                  }}
                  className="text-slate-600 leading-relaxed text-[1.05rem]"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Tech tags — spring-pop */}
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Sanity",
                "Tailwind CSS",
                "PostgreSQL",
                "Docker",
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 18,
                    delay: 0.3 + i * 0.06,
                  }}
                  className="bg-teal-50 text-teal-800 border border-teal-200 text-sm font-semibold px-3.5 py-1.5 rounded-full"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
