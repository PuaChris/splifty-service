import { z } from 'zod'
import { USER_SCHEMA } from './users-types'

export const PARTY_SCHEMA = z.object({
  id: z.string(),
  percent: z.number(),
  amountOwed: z.number(),
  settled: z.boolean(),

  user: USER_SCHEMA,
})

export interface PartyBody extends z.infer<typeof PARTY_SCHEMA> {}
