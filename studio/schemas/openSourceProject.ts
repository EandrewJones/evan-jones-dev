import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'openSourceProject',
  title: 'Open Source Project',
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
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Contributor', value: 'Contributor'},
          {title: 'Committer', value: 'Committer'},
          {title: 'PMC', value: 'PMC'},
          {title: 'Author', value: 'Author'},
        ],
      },
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'number',
      options: {
        list: [
          {title: 'Apache Software Foundation', value: 0},
          {title: 'Cloud Native Computing Foundation', value: 1},
          {title: 'None', value: 2},
        ],
      },
    }),
    defineField({
      name: 'github',
      title: 'github',
      type: 'url',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
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
