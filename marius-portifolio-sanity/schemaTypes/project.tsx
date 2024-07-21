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
      description: 'En kort undertittel for prosjektet',
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
      name: 'author',
      title: 'Forfatter',
      description: 'Forfatteren av prosjektet',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'images',
      title: 'Bilder',
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
      title: 'Teknologier',
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
      title: 'Published at',
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
      title: 'Varighet',
      description: 'Hvor lang tid tok prosjektet?',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      description: 'URL til prosjektet',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
    }),
  ],
})
