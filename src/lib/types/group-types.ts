import { z } from 'zod'
import { USER_SCHEMA } from './user-types'

export const GROUP_SCHEMA = z.object({
  id: z.string(),
  name: z.string(),
  users: z.array(USER_SCHEMA),
})

export interface GroupBody extends z.infer<typeof GROUP_SCHEMA> {}
