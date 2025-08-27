import type { Block } from 'payload'
import { link } from '@/fields/link'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'

export const ContentWithSlider: Block = {
  slug: 'contentWithSlider',
  interfaceName: 'ContentWithSliderBlock',
  dbName: 'content_slider',
  fields: [
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
      type: 'radio',
      name: 'sliderType',
      options: [
        {
          label: 'Only Text',
          value: 'onlyText',
        },
        {
          label: 'OnlyImage',
          value: 'onlyImage',
        },
        {
          label: 'Both',
          value: 'both',
        },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      fields: [
        {
          name: 'content',
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
          label: 'Content',
          admin: {
            condition: (_data, siblingData, { blockData }) => {
              return blockData?.sliderType !== 'onlyImage'
            },
          },
        },
        {
          name: 'userName',
          type: 'text',
          label: 'User Name',
          admin: {
            condition: (_data, siblingData, { blockData }) => {
              return blockData?.sliderType === 'onlyText'
            },
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_data, siblingData, { blockData }) => {
              return blockData?.sliderType === 'both'
            },
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_data, siblingData, { blockData }) => {
              return blockData?.sliderType !== 'onlyText'
            },
          },
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          admin: {
            condition: (_data, siblingData, { blockData }) => {
              return blockData?.sliderType === 'both'
            },
          },
        },
        link({
          overrides: {
            admin: {
              condition: (_data, siblingData, { blockData }) => {
                return Boolean(siblingData?.enableLink) && blockData?.sliderType !== 'onlyImage'
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
          admin: {
            condition: (_data, siblingData, { blockData }) => {
              return blockData?.sliderType === 'both'
            },
          },
        },
      ],
    },
  ],
}
