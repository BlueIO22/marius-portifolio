"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteContent } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { GitHubLogoIcon, ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon, Cross2Icon } from "@radix-ui/react-icons";

interface ProjectsProps {
  data: SiteContent["projects"];
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SLIDE_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ images, startIdx, onClose }: {
  images: string[];
  startIdx: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const [dir, setDir] = useState(1);

  const go = (next: number, d: number) => { setDir(d); setIdx(next); };
  const prev = () => go((idx - 1 + images.length) % images.length, -1);
  const next = () => go((idx + 1) % images.length, 1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
      style={{ backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)", backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      {/* Image */}
      <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={idx}
            src={images[idx]}
            alt=""
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: SLIDE_EASE }}
            className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
          />
        </AnimatePresence>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors">
              <ChevronLeftIcon className="w-5 h-5 text-slate-800" />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors">
              <ChevronRightIcon className="w-5 h-5 text-slate-800" />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button key={i} onClick={() => go(i, i > idx ? 1 : -1)}
                className={`rounded-full transition-all duration-200 ${i === idx ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Close */}
      <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors" aria-label="Lukk">
        <Cross2Icon className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────

function FlipGallery({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [lightbox, setLightbox] = useState(false);

  const go = (next: number, d: number) => { setDir(d); setIdx(next); };
  const prev = () => go((idx - 1 + images.length) % images.length, -1);
  const next = () => go((idx + 1) % images.length, 1);

  return (
    <>
      <div className="relative select-none pr-4 pb-4">
        <div className="absolute top-4 left-4 right-0 bottom-0 bg-teal-400 rounded-3xl" />

        <div className="relative overflow-hidden rounded-3xl aspect-[4/3] bg-slate-100">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.img
              key={idx}
              src={images[idx]}
              alt=""
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit:  (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: SLIDE_EASE }}
              onClick={() => setLightbox(true)}
              className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            />
          </AnimatePresence>

          {/* Expand hint */}
          <div className="absolute bottom-3 right-3 bg-black/40 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full pointer-events-none">
            Klikk for å forstørra
          </div>

          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors" aria-label="Førre bilete">
                <ChevronLeftIcon className="w-4 h-4 text-slate-700" />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-colors" aria-label="Neste bilete">
                <ChevronRightIcon className="w-4 h-4 text-slate-700" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {images.map((_, i) => (
              <button key={i} onClick={() => go(i, i > idx ? 1 : -1)}
                className={`rounded-full transition-all duration-200 ${i === idx ? "w-5 h-2 bg-teal-500" : "w-2 h-2 bg-slate-300 hover:bg-teal-300"}`}
                aria-label={`Bilete ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && <Lightbox images={images} startIdx={idx} onClose={() => setLightbox(false)} />}
      </AnimatePresence>
    </>
  );
}

// ── Projects Section ──────────────────────────────────────────────────────────

const sectionBg = ["bg-[#f8fffe]", "bg-white"] as const;

export function Projects({ data }: ProjectsProps) {
  return (
    <div id="prosjekt">
      {/* Section header */}
      <div className="bg-[#f8fffe] pt-36 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-label">Det eg har laga</span>
            <h2
              className="font-black text-[#0c1117] mt-4 leading-tight"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}
            >
              Prosjekt<span className="text-teal-500">.</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* One full-width section per project */}
      {data.map((project, i) => {
        const isEven = i % 2 === 0;
        const num = String(i + 1).padStart(2, "0");

        return (
          <section
            key={project.id}
            className={`${sectionBg[i % 2]} py-36 px-6 overflow-hidden border-t border-slate-100`}
          >
            <div className="max-w-6xl mx-auto">
              <div
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  isEven ? "" : "lg:[&>*:first-child]:order-2"
                }`}
              >
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease: EASE }}
                >
                  <p
                    className="font-black text-teal-100 select-none leading-none mb-2"
                    style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
                    aria-hidden
                  >
                    {num}
                  </p>

                  <h3
                    className="font-black text-[#0c1117] leading-tight mb-3"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                  >
                    {project.title}
                  </h3>

                  <p className="text-teal-600 font-bold text-lg mb-1">{project.subtitle}</p>
                  <p className="text-slate-400 text-sm mb-6">{project.duration}</p>
                  <p className="text-slate-600 leading-relaxed text-[1.05rem] mb-8">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-[12px] font-semibold bg-teal-50 text-teal-800 border-teal-200 px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 !px-5 !text-sm">
                        <GitHubLogoIcon className="w-4 h-4" /> GitHub
                      </a>
                    )}
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5 !px-5 !text-sm">
                        <ExternalLinkIcon className="w-4 h-4" /> Sjå live
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* Flip Gallery */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
                >
                  <FlipGallery images={project.images} />
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
