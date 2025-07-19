import { defineType } from 'sanity'

export const localizedBlockContent = defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    {
      name: 'it',
      title: 'Italian',
      type: 'blockContent',
    },
    {
      name: 'en',
      title: 'English',
      type: 'blockContent',
    },
  ],
})