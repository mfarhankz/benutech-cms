'use server'

import { getCachedGlobal } from '@/utilities/getGlobals'
import type { OurClient } from '@/payload-types'

export async function getOurClientsData(): Promise<OurClient | null> {
  try {
    return await getCachedGlobal('ourClients')()
  } catch (error) {
    console.error('Error fetching OurClients data:', error)
    return null
  }
}
