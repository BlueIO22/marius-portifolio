import { Nav } from "@/components/Nav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Marius Sørenes — Portifolio",
  description:
    "Fullstack-utviklar med lidenskap for å byggja vakre og raske nettapplikasjonar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nn" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-white text-[#0c1117] antialiased`}>
        <Nav />
        {children}

        {/* Footer */}
        <footer className="border-t border-slate-100 py-8 px-6 text-center text-sm text-slate-400">
          <span>© {new Date().getFullYear()} Marius Sørenes — laga med </span>
          <span className="text-teal-500 font-semibold">Next.js</span>
          <span> + </span>
          <span className="text-teal-500 font-semibold">Sanity</span>
        </footer>
      </body>
    </html>
  );
}
