import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nettstadinstillingar',
  type: 'document',
  fields: [
    // ── Meta ──────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Sidetittel',
      description: 'Tittelen som vises i nettlesarfana',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Metaskildring',
      description: 'Skildring for søkjemotorar og sosiale medium',
      type: 'text',
      rows: 3,
    }),

    // ── Hero ──────────────────────────────────────────────────────────
    defineField({
      name: 'heroName',
      title: 'Namn (hero)',
      description: 'Det store namnet øvst på sida',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Tittel / rolle (hero)',
      description: 'T.d. «Fullstack-utviklar»',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Ingress (hero)',
      description: 'Ei kort setning eller to under tittelen',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroCta',
      title: 'Hovud-CTA-tekst',
      description: 'T.d. «Sjå arbeidet mitt»',
      type: 'string',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Sekundær CTA-tekst',
      description: 'T.d. «Kontakt meg»',
      type: 'string',
    }),

    // ── Om meg ────────────────────────────────────────────────────────
    defineField({
      name: 'aboutHeading',
      title: 'Om-overskrift',
      description: 'T.d. «Om meg»',
      type: 'string',
    }),
    defineField({
      name: 'aboutBio',
      title: 'Bio',
      description: 'Ein eller fleire avsnitt om deg sjølv',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'aboutImage',
      title: 'Profilbilde',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn-URL',
      type: 'url',
    }),

    // ── Kontakt ───────────────────────────────────────────────────────
    defineField({
      name: 'contactHeading',
      title: 'Kontakt-overskrift',
      description: 'T.d. «Kontakt meg»',
      type: 'string',
    }),
    defineField({
      name: 'contactSubheading',
      title: 'Kontakt-ingress',
      description: 'Ei kort setning under overskrifta',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'email',
      title: 'E-postadresse',
      type: 'string',
    }),

    // ── Sosiale medium ────────────────────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Sosiale medium',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          title: 'Lenkje',
          fields: [
            defineField({
              name: 'platform',
              title: 'Plattform',
              description: 'T.d. GitHub, LinkedIn, Twitter',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
            defineField({
              name: 'icon',
              title: 'Ikon-nøkkel',
              description: 'Ein av: github, linkedin, twitter',
              type: 'string',
              options: {
                list: [
                  {title: 'GitHub', value: 'github'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Twitter / X', value: 'twitter'},
                ],
              },
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'metaTitle'},
    prepare({title}) {
      return {title: title ?? 'Nettstadinstillingar'}
    },
  },
})
