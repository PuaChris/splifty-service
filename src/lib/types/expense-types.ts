import { SplitMethod } from '@prisma/client'
import { PARTY_SCHEMA } from './party-types'
import { USER_SCHEMA } from './user-types'
import { z } from 'zod'

export const EXPENSE_SCHEMA = z.object({
  id: z.string(),
  title: z.string(),
  date: z.date(), // Assuming you handle the default value on the Prisma side
  cost: z.number(), // In Zod, you would handle Decimal as a number or string, depending on your Decimal library usage
  type: z.string().optional(),
  status: z.string().nullable(),
  splitMethod: z.nativeEnum(SplitMethod),
  owner: USER_SCHEMA,
  parties: z.array(PARTY_SCHEMA),
})

export interface ExpenseBody extends z.infer<typeof EXPENSE_SCHEMA> {}
