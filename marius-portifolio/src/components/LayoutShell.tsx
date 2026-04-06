"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";

const HIDDEN_CHROME_PATHS = ["/hvor-mange-dager"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDDEN_CHROME_PATHS.includes(pathname);

  return (
    <>
      {!hideChrome && <Nav />}
      {children}
      {!hideChrome && (
        <footer className="border-t border-slate-100 py-8 px-6 text-center text-sm text-slate-400">
          <span>© {new Date().getFullYear()} Marius Sørenes — laga med </span>
          <span className="text-teal-500 font-semibold">Next.js</span>
          <span> + </span>
          <span className="text-teal-500 font-semibold">Sanity</span>
        </footer>
      )}
    </>
  );
}
