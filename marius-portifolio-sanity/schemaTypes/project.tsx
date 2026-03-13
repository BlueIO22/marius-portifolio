import {defineArrayMember, defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Prosjekt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      description: 'Tittelen på prosjektet',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Undertittel',
      description: 'Ei kort undertittel for prosjektet',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Utvald prosjekt',
      description: 'Marker prosjektet som utvald (vises med badge)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'author',
      title: 'Forfattar',
      description: 'Forfattaren av prosjektet',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'images',
      title: 'Bilete',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      name: 'technologies',
      title: 'Teknologiar',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: {type: 'technology'},
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publisert',
      type: 'datetime',
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      description: 'URL til GitHub-repositoriet (om det er public)',
      type: 'url',
    }),
    defineField({
      name: 'duration',
      title: 'Periode',
      description: 'T.d. «2023 — 2024»',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Lenkje til prosjektet',
      description: 'URL til live-versjon (om det finst)',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Skildring',
      description: 'Ein kort tekst som skildrar prosjektet',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'images.0',
    },
  },
})
