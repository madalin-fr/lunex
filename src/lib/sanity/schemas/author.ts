import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'object',
      fields: [
        {
          name: 'it',
          title: 'Italian Slug',
          type: 'slug',
          options: {
            source: 'name.it',
            maxLength: 96,
          },
        },
        {
          name: 'en',
          title: 'English Slug',
          type: 'slug',
          options: {
            source: 'name.en',
            maxLength: 96,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'localizedString',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'localizedBlockContent',
    }),
  ],
  preview: {
    select: {
      title: 'name.it',
      titleEn: 'name.en',
      media: 'image',
    },
    prepare(selection) {
      const { title, titleEn } = selection
      return {
        title: title || titleEn,
        media: selection.media
      }
    },
  },
})