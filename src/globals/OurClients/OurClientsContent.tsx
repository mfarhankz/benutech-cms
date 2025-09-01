import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { OurClient } from '@/payload-types'

interface OurClientsContentProps {
  ourClientsData: OurClient
  pathname: string
}

export function OurClientsContent({ ourClientsData, pathname }: OurClientsContentProps) {
  if (!ourClientsData?.enabled) {
    return null
  }

  const {
    content,
    backgroundImage,
    backgroundColor,
    enableCTA,
    ctaLink,
    ctaText,
    pageControl,
    includedPages,
    excludedPages,
  } = ourClientsData

  // Determine if this section should show on current page
  const shouldShow = (() => {
    if (pageControl === 'all') return true

    if (pageControl === 'include') {
      return includedPages?.some((page) => {
        const pageSlug = typeof page === 'object' ? page.slug : page
        return pathname === `/${pageSlug}` || (pageSlug === 'home' && pathname === '/')
      })
    }

    if (pageControl === 'exclude') {
      return !excludedPages?.some((page) => {
        const pageSlug = typeof page === 'object' ? page.slug : page
        return pathname === `/${pageSlug}` || (pageSlug === 'home' && pathname === '/')
      })
    }

    return true
  })()

  if (!shouldShow) {
    return null
  }

  return (
    <section
      className={cn('py-16 relative', {
        'bg-gray-50': backgroundColor === 'light',
        'bg-gray-900 text-white': backgroundColor === 'dark',
        'bg-white': backgroundColor === 'white',
      })}
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Media
            resource={backgroundImage}
            imgClassName="w-full h-full object-cover"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {content && <RichText data={content} enableGutter={false} />}

          {enableCTA && ctaLink && ctaText && (
            <div className="mt-8">
              <CMSLink
                {...ctaLink}
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {ctaText}
              </CMSLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
