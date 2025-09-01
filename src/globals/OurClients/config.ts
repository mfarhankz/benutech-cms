import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { defaultLexical } from '@/fields/defaultLexical'

export const OurClients: GlobalConfig = {
  slug: 'ourClients',
  access: {
    read: () => true,
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
      name: 'content',
      type: 'richText',
      ...defaultLexical,
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: [
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Light Gray',
          value: 'light',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
      ],
      defaultValue: 'white',
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
      },
    },
    {
      name: 'enableCTA',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData?.enabled,
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.enabled && siblingData?.enableCTA,
      },
    },
    {
      name: 'ctaLink',
      type: 'group',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.enabled && siblingData?.enableCTA,
      },
    },
  ],
}
