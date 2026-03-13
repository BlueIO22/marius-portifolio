export const revalidate = false; // static until webhook fires

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Faith } from "@/components/sections/Faith";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Divider } from "@/components/Divider";
import { content as fallback, SiteContent } from "@/data/content";
import { fetchSiteSettings, fetchProjects } from "@/util/sanity";

export default async function Home() {
  let data: SiteContent = fallback;

  try {
    const [settings, projects] = await Promise.all([
      fetchSiteSettings(),
      fetchProjects(),
    ]);

    if (settings) {
      data = {
        meta: {
          title: settings.metaTitle || fallback.meta.title,
          description: settings.metaDescription || fallback.meta.description,
        },
        hero: {
          name: settings.heroName || fallback.hero.name,
          title: settings.heroTitle || fallback.hero.title,
          subtitle: settings.heroSubtitle || fallback.hero.subtitle,
          ctaText: settings.heroCta || fallback.hero.ctaText,
          ctaLink: "#prosjekt",
          secondaryCtaText: settings.heroSecondaryCta || fallback.hero.secondaryCtaText,
          secondaryCtaLink: "#kontakt",
        },
        about: {
          heading: settings.aboutHeading || fallback.about.heading,
          bio: settings.aboutBio || fallback.about.bio,
          image: settings.aboutImage || fallback.about.image,
          linkedin: settings.linkedin || fallback.about.linkedin,
        },
        projects:
          Array.isArray(projects) && projects.length > 0
            ? projects.map((p: Record<string, unknown>, i: number) => ({
                id: (p._id as string) || `proj-${i}`,
                title: (p.title as string) || "",
                subtitle: (p.subtitle as string) || "",
                description: (p.description as string) || "",
                images: Array.isArray(p.images) && (p.images as string[]).filter(Boolean).length > 0
                  ? (p.images as string[]).filter(Boolean)
                  : [`https://picsum.photos/seed/proj${i + 1}/800/500`],
                technologies: (p.technologies as string[]) || [],
                github: p.github as string | undefined,
                url: p.url as string | undefined,
                duration: (p.duration as string) || "",
                featured: (p.featured as boolean) || false,
              }))
            : fallback.projects,
        contact: {
          heading: settings.contactHeading || fallback.contact.heading,
          subheading: settings.contactSubheading || fallback.contact.subheading,
          email: settings.email || fallback.contact.email,
          social:
            Array.isArray(settings.socialLinks) && settings.socialLinks.length > 0
              ? settings.socialLinks
              : fallback.contact.social,
        },
      };
    }
  } catch (err) {
    console.error("[portfolio] Sanity fetch failed, using fallback:", err);
  }

  return (
    <main className="relative overflow-x-hidden">
      <Hero data={data.hero} />
      <Divider />
      <About data={data.about} />
      <Faith />
      <Projects data={data.projects} />
      <Contact data={data.contact} />
    </main>
  );
}
