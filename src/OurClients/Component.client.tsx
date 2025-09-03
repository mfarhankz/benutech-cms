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
    <section className={cn('py-40 relative')}>
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {heading && <RichText data={heading} enableGutter={false} />}
        </div>
        <div className="flex justify-center items-center gap-14 pt-14">
          {columns?.map((col, index) => {
            const { logo } = col
            return (
              <div
                key={index}
                className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-300"
              >
                {logo && <Media resource={logo} />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
