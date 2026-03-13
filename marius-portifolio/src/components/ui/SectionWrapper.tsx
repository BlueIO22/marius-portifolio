"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Entry direction: up (default), left, right */
  from?: "up" | "left" | "right";
}

const initialMap = {
  up:    { opacity: 0, y: 50 },
  left:  { opacity: 0, x: -60 },
  right: { opacity: 0, x: 60 },
};

const animateMap = {
  up:    { opacity: 1, y: 0 },
  left:  { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
};

export function SectionWrapper({
  id,
  children,
  className = "",
  from = "up",
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={initialMap[from]}
      whileInView={animateMap[from]}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className={`py-24 px-4 ${className}`}
    >
      {children}
    </motion.section>
  );
}
