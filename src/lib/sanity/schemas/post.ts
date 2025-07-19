import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
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
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'localizedText',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localizedBlockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title.it',
      titleEn: 'title.en',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, titleEn, author } = selection
      return {
        title: title || titleEn,
        subtitle: author && `by ${author.it || author.en || author}`
      }
    },
  },
})