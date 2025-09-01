import type { GlobalConfig } from 'payload'
import { revalidateOurClients } from './hooks/revalidateOurClients'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Banner } from '../blocks/Banner/config'
import { Code } from '../blocks/Code/config'
import { MediaBlock } from '../blocks/MediaBlock/config'

export const OurClients: GlobalConfig = {
  slug: 'ourClients',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateOurClients],
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Enable the our clients section',
      },
    },
    {
      name: 'pageControl',
      type: 'select',
      options: [
        {
          label: 'Show on all pages',
          value: 'all',
        },
        {
          label: 'Show only on specific pages',
          value: 'include',
        },
        {
          label: 'Hide on specific pages',
          value: 'exclude',
        },
      ],
      defaultValue: 'all',
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
        description: 'Choose which pages should display this section',
      },
    },
    {
      name: 'includedPages',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.enabled && siblingData?.pageControl === 'include',
        description: 'Select pages where this section should appear',
      },
    },
    {
      name: 'excludedPages',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.enabled && siblingData?.pageControl === 'exclude',
        description: 'Select pages where this section should NOT appear',
      },
    },
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: 'Heading',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
