"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SiteContent } from "@/data/content";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

interface ContactProps {
  data: SiteContent["contact"];
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const iconMap: Record<string, React.ReactNode> = {
  github:   <GitHubLogoIcon className="w-4 h-4" />,
  linkedin: <LinkedInLogoIcon className="w-4 h-4" />,
  twitter:  <TwitterLogoIcon className="w-4 h-4" />,
};

const inputClass =
  "w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-teal-500 transition-colors duration-150";

type State = "idle" | "submitting" | "success" | "error";

export function Contact({ data }: ContactProps) {
  const loadedAt = useRef<number>(0);
  const [state, setState] = useState<State>("idle");
  const [err, setErr] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => { loadedAt.current = Date.now(); }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErr("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: honeypot, _formLoadedAt: loadedAt.current }),
      });
      if (res.status === 429) { setErr("For mange førespurnader. Vent litt og prøv att."); setState("error"); return; }
      setState("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setErr("Noko gjekk gale. Prøv att.");
      setState("error");
    }
  };

  return (
    <section id="kontakt" className="bg-white py-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Huge heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <span className="section-label">Ta kontakt</span>
          <h2
            className="font-black text-[#0c1117] mt-4 leading-tight"
            style={{ fontSize: "clamp(2.75rem, 6vw, 5.5rem)" }}
          >
            {data.heading}<span className="text-teal-500">.</span>
          </h2>
          <p className="text-slate-500 text-lg mt-4 max-w-lg">{data.subheading}</p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_340px] gap-10 items-start">

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
            className="space-y-5"
          >
            {/* Honeypot */}
            <input
              type="text" name="website" value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute -left-[9999px] opacity-0 w-px h-px"
              tabIndex={-1} autoComplete="off" aria-hidden="true"
            />

            {[
              { id: "name",  label: "Namn",   type: "text",  placeholder: "Ditt namn" },
              { id: "email", label: "E-post",  type: "email", placeholder: "din@epost.no" },
            ].map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.08, ease: EASE }}
              >
                <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor={f.id}>
                  {f.label}
                </label>
                <input
                  id={f.id} name={f.id} type={f.type} required
                  value={fields[f.id as keyof typeof fields]}
                  onChange={onChange} placeholder={f.placeholder}
                  className={inputClass}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24, ease: EASE }}
            >
              <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="message">
                Melding
              </label>
              <textarea
                id="message" name="message" required rows={5}
                value={fields.message} onChange={onChange}
                placeholder="Fortel meg om prosjektet ditt..."
                className={`${inputClass} resize-none`}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={state === "submitting"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state === "submitting" ? "Sender…" : "Send melding →"}
            </motion.button>

            {state === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal-700 font-semibold text-sm text-center"
              >
                ✓ Meldinga er sendt — eg kjem tilbake til deg snart!
              </motion.p>
            )}
            {state === "error" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center"
              >
                {err}
              </motion.p>
            )}
          </motion.form>

          {/* Right: links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="flex flex-col gap-8"
          >
            {/* Email */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-3">
                Direkte kontakt
              </p>
              <a
                href={`mailto:${data.email}`}
                className="inline-flex items-center gap-3 group"
              >
                <span className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition-colors">
                  <EnvelopeClosedIcon className="w-4 h-4" />
                </span>
                <span className="font-semibold text-slate-700 group-hover:text-teal-700 transition-colors">
                  {data.email}
                </span>
              </a>
            </div>

            {/* Socials */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-3">
                Finn meg på nett
              </p>
              <div className="flex flex-col gap-3">
                {data.social.map((link, i) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, ease: EASE }}
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-3 group"
                  >
                    <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-50 group-hover:border-teal-200 group-hover:text-teal-600 transition-all">
                      {iconMap[link.icon] ?? null}
                    </span>
                    <span className="font-semibold text-slate-600 group-hover:text-teal-700 transition-colors">
                      {link.platform}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
