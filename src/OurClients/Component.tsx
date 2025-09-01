import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { OurClient } from '@/payload-types'

import { OurClientsClient } from './Component.client'

export async function OurClients() {
  const ourClientsData: OurClient = await getCachedGlobal('ourClients', 1)()

  return <OurClientsClient data={ourClientsData} />
}
