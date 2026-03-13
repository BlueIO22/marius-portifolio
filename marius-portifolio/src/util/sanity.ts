import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "nnru6l08",
  dataset: "production",
  apiVersion: "2024-07-17",
  useCdn: false,
});

export async function fetchSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0] {
    metaTitle,
    metaDescription,
    heroName,
    heroTitle,
    heroSubtitle,
    heroCta,
    heroSecondaryCta,
    aboutHeading,
    aboutBio,
    "aboutImage": aboutImage.asset->url,
    linkedin,
    contactHeading,
    contactSubheading,
    email,
    socialLinks[] {
      platform,
      url,
      icon
    }
  }`);
}

export async function fetchProjects() {
  return client.fetch(`*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    description,
    "images": images[].asset->url,
    "technologies": technologies[]->title,
    github,
    url,
    duration,
    featured,
    "slug": slug.current
  }`);
}
