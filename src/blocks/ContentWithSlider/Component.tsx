'use client'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

import type { ContentWithSliderBlock as ContentWithSliderBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'

export const ContentWithSliderBlock: React.FC<ContentWithSliderBlockProps> = (props) => {
  const { columns, heading, sliderType } = props

  return (
    <div
      className={cn('container-fluid', {
        'bg-slate-50': sliderType === 'onlyImage',
        'bg-slate-900': sliderType === 'onlyText',
        'bg-white': sliderType === 'both',
      })}
    >
      <div className="container pt-32 pb-32 text-center">
        {heading && <RichText data={heading} enableGutter={false} />}
        <Carousel
          className="w-full"
          opts={{ loop: true, align: 'start' }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {columns?.map((col, index) => {
              const { enableLink, media, content, textPosition, logo, link, userName } = col
              return (
                <CarouselItem key={index}>
                  <div
                    className={cn('grid gap-y-8 gap-x-16 pt-12 px-20', {
                      'grid-cols-2': sliderType === 'both',
                      'grid-cols-1': sliderType !== 'both',
                    })}
                  >
                    <div
                      className={cn('flex flex-col justify-center text-left', {
                        'order-1': textPosition === 'right',
                        'text-center': sliderType === 'onlyText',
                      })}
                      key={`text-${index}`}
                    >
                      {logo && <Media resource={logo} className="mb-5" />}
                      {content && <RichText data={content} enableGutter={false} />}
                      {userName && sliderType === 'onlyText' && (
                        <div className="text-lg font-light uppercase text-white mt-3 text-center">
                          {userName}
                        </div>
                      )}
                      {enableLink && <CMSLink {...link} className="w-fit mt-4" />}
                    </div>
                    <div
                      className={cn({
                        'order-2': textPosition === 'left',
                        'flex justify-center items-center': sliderType === 'onlyImage',
                      })}
                      key={`media-${index}`}
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
    </div>
  )
}
