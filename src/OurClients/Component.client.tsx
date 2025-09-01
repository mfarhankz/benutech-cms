'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import type { OurClient } from '@/payload-types'

interface OurClientsClientProps {
  data: OurClient
}

export function OurClientsClient({ data }: OurClientsClientProps) {
  const pathname = usePathname()

  if (!data?.enabled) {
    return null
  }

  const { heading, columns, pageControl, includedPages, excludedPages } = data

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
    <section className={cn('py-16 relative')}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {heading && <RichText data={heading} enableGutter={false} />}
        </div>

        {columns && columns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {columns.map((column, index) => (
              <div key={index} className="relative">
                {column.logo && (
                  <Media
                    resource={column.logo}
                    imgClassName="w-full h-48 object-cover rounded-lg"
                    className="w-full h-48"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
