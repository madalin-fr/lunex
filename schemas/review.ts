import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'localizedString',
      description: 'A short title or headline for this review',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientPhoto',
      title: 'Client Photo',
      type: 'image',
      description: 'Profile picture of the client (optional)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'localizedString',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO',
        },
      ],
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      options: {
        list: [
          {title: 'Office Cleaning / Pulizie Uffici', value: 'office'},
          {title: 'Domestic Cleaning / Pulizie Domestiche', value: 'domestic'},
          {title: 'Post-Renovation Cleaning / Pulizie Post-Ristrutturazione', value: 'post-renovation'},
          {title: 'Villa Cleaning / Pulizie Ville', value: 'villa'},
          {title: 'Deep Cleaning / Pulizie Approfondite', value: 'deep'},
          {title: 'Maintenance Cleaning / Pulizie di Mantenimento', value: 'maintenance'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (Number of Stars)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [
          {title: '1 Star', value: 1},
          {title: '2 Stars', value: 2},
          {title: '3 Stars', value: 3},
          {title: '4 Stars', value: 4},
          {title: '5 Stars', value: 5},
        ],
      },
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'localizedText',
      description: 'The main review text/testimonial from the client',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this review prominently on the website',
      initialValue: false,
    }),
    defineField({
      name: 'verified',
      title: 'Verified Review',
      type: 'boolean',
      description: 'This review has been verified as authentic',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title.it',
      titleEn: 'title.en',
      clientName: 'clientName.it',
      clientNameEn: 'clientName.en',
      service: 'service',
      rating: 'rating',
      date: 'publishedAt',
      media: 'clientPhoto',
    },
    prepare(selection) {
      const {title, titleEn, clientName, clientNameEn, service, rating, date, media} = selection
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date'
      const displayTitle = title || titleEn || 'Review'
      const displayClientName = clientName || clientNameEn || 'Anonymous'
      return {
        title: `${displayTitle} - ${stars}`,
        subtitle: `${displayClientName} • ${service} • ${dateStr}`,
        media,
      }
    },
  },
})