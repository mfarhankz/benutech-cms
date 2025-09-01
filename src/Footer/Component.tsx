import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer')()

  const navItems = footerData?.navItems || []
  const footerText = footerData?.footerText

  return (
    <>
      <div className="bg-slate-100">
        {footerText && (
          <div className="container py-12 gap-8">
            <RichText className="max-w-[100%] mx-auto !text-sm" data={footerText} />
          </div>
        )}
      </div>
      <footer className="mt-auto">
        <div className="container py-8 gap-8">
          {/* <Link className="flex items-center" href="/">
          <Logo />
        </Link> */}

          <div className="flex flex-col items-center gap-4">
            {/* <ThemeSelector /> */}
            <nav className="flex flex-col  md:flex-row gap-4">
              {navItems.map(({ link }, i) => {
                return <CMSLink className="text-black" key={i} {...link} />
              })}
            </nav>
            <p className="text-[12px] text-gray-800">
              ©2025 - Present, Benutech.com. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
