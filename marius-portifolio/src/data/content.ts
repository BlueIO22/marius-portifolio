export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  technologies: string[];
  github?: string;
  url?: string;
  duration: string;
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteContent {
  meta: { title: string; description: string };
  hero: {
    name: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
  };
  about: {
    heading: string;
    bio: string;
    image: string;
    linkedin: string;
  };
  projects: Project[];
  contact: {
    heading: string;
    subheading: string;
    email: string;
    social: SocialLink[];
  };
}

// Nynorsk fallback — brukt om Sanity ikkje er konfigurert enno
export const content: SiteContent = {
  meta: {
    title: "Marius Sørenes — Portifolio",
    description:
      "Fullstack-utviklar med lidenskap for å byggja vakre og raske nettapplikasjonar.",
  },
  hero: {
    name: "Marius Sørenes",
    title: "Fullstack-utviklar",
    subtitle:
      "Eg byggjer moderne nettapplikasjonar med fokus på gode brukaropplevingar og rein, vedlikehaldbar kode.",
    ctaText: "Sjå arbeidet mitt",
    ctaLink: "#prosjekt",
    secondaryCtaText: "Kontakt meg",
    secondaryCtaLink: "#kontakt",
  },
  about: {
    heading: "Om meg",
    bio: "Eg er ein engasjert fullstack-utviklar med solid erfaring frå både frontend og backend. Eg elskar å omsetta kompliserte problem til elegante og intuitive løysingar.\n\nMed røynsle frå heile webutviklingsstakken — frå piksel-perfekte grensesnitt til skalerbare API-ar — trivst eg best i samarbeidande miljø der handverk og pragmatisme går hand i hand.\n\nNår eg ikkje kodar, utforskar eg ny teknologi, bidreg til open kjeldekode, eller nyt naturen.",
    image: "https://picsum.photos/seed/marius/400/400",
    linkedin: "https://www.linkedin.com/in/mariussorenes",
  },
  projects: [
    {
      id: "proj-1",
      title: "Portifolio-CMS",
      subtitle: "Personleg portifolio med Sanity CMS",
      description:
        "Eit moderne utviklar-portifolio driven av Next.js 14 og Sanity CMS, med rulleanimasjonar, eit lyst og leikete designsystem og ein kontaktfunksjon med bottvern.",
      images: ["https://picsum.photos/seed/proj1a/800/500", "https://picsum.photos/seed/proj1b/800/500", "https://picsum.photos/seed/proj1c/800/500"],
      technologies: ["Next.js", "TypeScript", "Sanity", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/mariussorenes/portfolio",
      duration: "2024 — no",
      featured: true,
    },
    {
      id: "proj-2",
      title: "Netthandelsplattform",
      subtitle: "Fullstack handelsoppleveing",
      description:
        "Ein skalerbar netthandelsplattform med Next.js App Router, sanntidslagerstatus, Stripe-betaling og eit admin-panel med analysar.",
      images: ["https://picsum.photos/seed/proj2a/800/500", "https://picsum.photos/seed/proj2b/800/500", "https://picsum.photos/seed/proj2c/800/500"],
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "shadcn/ui"],
      github: "https://github.com/mariussorenes/ecommerce",
      url: "https://shop.example.com",
      duration: "2023 — 2024",
      featured: true,
    },
    {
      id: "proj-3",
      title: "Oppgåvehandterar",
      subtitle: "Sanntids samarbeidsflate",
      description:
        "Ein Kanban-basert oppgåvehandterar med sanntidssamarbeid via WebSockets, dra-og-slipp-tavler og detaljert aktivitetslogg.",
      images: ["https://picsum.photos/seed/proj3a/800/500", "https://picsum.photos/seed/proj3b/800/500"],
      technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      github: "https://github.com/mariussorenes/taskify",
      duration: "2023",
    },
    {
      id: "proj-4",
      title: "Vêrtavle",
      subtitle: "Visualiser klimadata vakkert",
      description:
        "Eit interaktivt vêrpanel som hentar frå fleire offentlege API-ar, med animerte diagram, stadsbaserte vêrvarsel og eit konfigurerbart varslingssystem.",
      images: ["https://picsum.photos/seed/proj4a/800/500", "https://picsum.photos/seed/proj4b/800/500"],
      technologies: ["React", "D3.js", "TypeScript", "OpenWeather API"],
      github: "https://github.com/mariussorenes/weather",
      url: "https://weather.example.com",
      duration: "2022 — 2023",
    },
    {
      id: "proj-5",
      title: "Utviklar-blogg",
      subtitle: "MDX-driven blogg",
      description:
        "Ein rask utviklar-blogg med Next.js, MDX og tilpassa syntaksutheving, fulltekstsøk, lesetidsestimat og RSS-generering.",
      images: ["https://picsum.photos/seed/proj5a/800/500", "https://picsum.photos/seed/proj5b/800/500"],
      technologies: ["Next.js", "MDX", "Tailwind CSS", "Contentlayer"],
      github: "https://github.com/mariussorenes/devblog",
      duration: "2022",
    },
    {
      id: "proj-6",
      title: "CLI-verktøy",
      subtitle: "Produktivitetsverktøy for utviklaren",
      description:
        "Ei samling Node.js CLI-program for å automatisera vanlege utviklings-arbeidsflyt — stillasbygging, linting, git-hooks og utrullingspipeline.",
      images: ["https://picsum.photos/seed/proj6a/800/500", "https://picsum.photos/seed/proj6b/800/500"],
      technologies: ["Node.js", "TypeScript", "Commander.js", "Inquirer"],
      github: "https://github.com/mariussorenes/cli-toolkit",
      duration: "2022",
    },
  ],
  contact: {
    heading: "Kontakt meg",
    subheading:
      "Har du eit prosjekt i tankane, eller vil du berre slå av ein prat? Eg høyrer gjerne frå deg.",
    email: "marius@example.com",
    social: [
      { platform: "GitHub", url: "https://github.com/mariussorenes", icon: "github" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/mariussorenes", icon: "linkedin" },
      { platform: "Twitter", url: "https://twitter.com/mariussorenes", icon: "twitter" },
    ],
  },
};
