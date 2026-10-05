import { defineField, defineType } from 'sanity'

export const mediaItem = defineType({
  name: 'mediaItem',
  title: 'Media / Project Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Thumbnail / Poster)',
      type: 'image',
      options: { hotspot: true },
      description: 'Opsional jika mengisikan Video URL (akan otomatis ditarik dari thumbnail YouTube)',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube)',
      type: 'url',
      description: 'Isi link YouTube jika proyek berupa video (misal: https://www.youtube.com/watch?v=xxx)',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images (Opsional jika ada foto Stills/BTS)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Sub-categories',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'date',
      title: 'Project Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
  ],
})