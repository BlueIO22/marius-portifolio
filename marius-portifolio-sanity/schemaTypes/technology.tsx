import {defineField, defineType} from 'sanity'

export const technology = defineType({
  name: 'technology',
  title: 'Teknologi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
