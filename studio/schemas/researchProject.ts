import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'researchProject',
  title: 'Research Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Working Paper', value: 'Working Paper'},
          {title: 'Published', value: 'Published'},
        ],
      },
    }),
    defineField({
      name: 'publication',
      title: 'Publication',
      type: 'string',
    }),
    defineField({
      name: 'datePublished',
      title: 'Date Published',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'manuscript',
      title: 'Manuscript',
      type: 'file',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'file',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      role: 'role',
      media: 'mainImage',
    },
  },
})
