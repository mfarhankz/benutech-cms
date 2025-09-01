'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getOurClientsData } from './actions'
import { OurClientsContent } from './OurClientsContent'
import type { OurClient } from '@/payload-types'

export function OurClientsClient() {
  const pathname = usePathname()
  const [ourClientsData, setOurClientsData] = useState<OurClient | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOurClientsData().then((data) => {
      setOurClientsData(data)
      setLoading(false)
    })
  }, [])

  if (loading || !ourClientsData) {
    return null
  }

  return <OurClientsContent ourClientsData={ourClientsData} pathname={pathname} />
}
