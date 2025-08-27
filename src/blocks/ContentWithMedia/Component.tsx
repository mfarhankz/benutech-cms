import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentWithMediaBlock as ContentWithMediaBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'

export const ContentWithMediaBlock: React.FC<ContentWithMediaBlockProps> = (props) => {
  const { columns } = props

  return (
    <div className="container">
      {columns &&
        columns.length > 0 &&
        columns.map((col, index) => {
          const { enableLink, media, content, textPosition, logo, link } = col
          return (
            <div className="grid grid-cols-2 gap-y-8 gap-x-16 py-12">
              <div
                className={cn('flex flex-col justify-center', {
                  'order-1': textPosition === 'right',
                })}
                key={index}
              >
                {logo && <Media imgClassName={cn()} resource={logo} className="mb-5 w-[50%]" />}
                {content && <RichText data={content} enableGutter={false} />}

                {enableLink && <CMSLink {...link} className="w-fit mt-4" />}
              </div>
              <div
                className={cn({
                  'order-2': textPosition === 'left',
                })}
                key={index}
              >
                {media && (
                  <Media
                    imgClassName={cn('border border-border rounded-[0.8rem]')}
                    resource={media}
                  />
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}
