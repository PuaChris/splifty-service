import { z } from 'zod'
import { GroupBody } from './group-types'

export const USER_SCHEMA = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().nullable(),
})

// Infer TypeScript types from the Zod schemas
export interface UserBody extends z.infer<typeof USER_SCHEMA> {
  groups?: GroupBody[]
}
