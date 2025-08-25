import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'

import type { ContentWithSliderBlock as ContentWithSliderBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'

export const ContentWithSliderBlock: React.FC<ContentWithSliderBlockProps> = (props) => {
  const { columns, heading, sliderType } = props

  return (
    <div className="container">
      {heading && <RichText data={heading} enableGutter={false} />}
      <Carousel className="w-full">
        <CarouselContent>
          {columns?.map((col, index) => {
            const { enableLink, media, content, textPosition, logo, link } = col
            return (
              <CarouselItem key={index}>
                <div
                  className={cn('grid gap-y-8 gap-x-16 py-12 px-20', {
                    'grid-cols-2': sliderType === 'both',
                    'grid-cols-1': sliderType !== 'both',
                  })}
                >
                  <div
                    className={cn('flex flex-col justify-center', {
                      'order-1': textPosition === 'right',
                      'text-center': sliderType === 'onlyText',
                    })}
                    key={index}
                  >
                    {logo && <Media imgClassName={cn()} resource={logo} className="mb-5" />}
                    {content && <RichText data={content} enableGutter={false} />}

                    {enableLink && <CMSLink {...link} className="w-fit" />}
                  </div>
                  <div
                    className={cn({
                      'order-2': textPosition === 'left',
                      'flex justify-center items-center': sliderType === 'onlyImage',
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
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
