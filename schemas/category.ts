import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
            source: 'title.it',
            maxLength: 96,
          },
        },
        {
          name: 'en',
          title: 'English Slug',
          type: 'slug',
          options: {
            source: 'title.en',
            maxLength: 96,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
    }),
  ],
  
  preview: {
    select: {
      title: 'title.it',
      titleEn: 'title.en',
    },
    prepare(selection) {
      const { title, titleEn } = selection
      return {
        title: title || titleEn
      }
    },
  },
})