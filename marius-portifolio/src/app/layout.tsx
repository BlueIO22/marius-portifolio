import { LayoutShell } from "@/components/LayoutShell";
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
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
