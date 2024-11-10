import { z } from 'zod'
import { GroupBody } from './groups-types'

export const USER_SCHEMA = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().optional(),
})

// Infer TypeScript types from the Zod schemas
export interface UserBody extends z.infer<typeof USER_SCHEMA> {
  groups?: GroupBody[]
}
