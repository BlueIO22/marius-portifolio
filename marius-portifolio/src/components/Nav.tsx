"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Om meg", href: "#om-meg" },
  { label: "Prosjekt", href: "#prosjekt" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = ["hero", "om-meg", "prosjekt", "kontakt"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (href: string) => {
    setMobileOpen(false);
    document
      .getElementById(href.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-300 ${
        scrolled ? "nav-solid shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              goto("#hero");
            }}
            className="text-2xl font-black tracking-tight text-[#0c1117] hover:text-teal-700 transition-colors"
          >
            Min portifolio<span className="text-teal-600">.</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goto(link.href);
                  }}
                  className={`text-sm font-semibold relative transition-colors ${
                    active
                      ? "text-teal-700"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-0.5 inset-x-0 h-0.5 bg-teal-500 rounded-full"
                    />
                  )}
                </a>
              );
            })}
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault();
                goto("#kontakt");
              }}
              className="btn-primary !py-2 !px-5 !text-sm"
            >
              Ta kontakt
            </a>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Meny"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  mobileOpen
                    ? i === 0
                      ? { rotate: 45, y: 7 }
                      : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                className="block w-5 h-[2px] bg-[#0c1117] origin-center"
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <nav className="flex flex-col px-6 py-5 gap-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goto(link.href);
                  }}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-semibold text-slate-700 hover:text-teal-700"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
