import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ContentWithMedia: Block = {
  slug: 'contentWithMedia',
  interfaceName: 'ContentWithMediaBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      fields: [
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'enableLink',
          type: 'checkbox',
        },
        link({
          overrides: {
            admin: {
              condition: (_data, siblingData) => {
                return Boolean(siblingData?.enableLink)
              },
            },
          },
        }),
        {
          type: 'radio',
          name: 'textPosition',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
        },
      ],
    },
  ],
}
