import { Prisma, SplitMethod } from '@prisma/client'

export const USERS_SEED_UPSERT_ARGS = [
  {
    data: {
      firstName: 'Chris',
      lastName: 'Pua',
      email: 'chris@prisma.io',
    },
  },
  {
    data: {
      firstName: 'Sam',
      lastName: 'Chau',
      email: 'sam@prisma.io',
    },
  },
  {
    data: {
      firstName: 'Joshua',
      lastName: 'Cai',
      email: '',
    },
  },
  {
    data: {
      firstName: 'Ting Feng',
      lastName: 'Gao',
      email: '',
    },
  },
]

export const EXPENSES_SEED_UPSERT_ARGS = [
  {
    data: {
      title: 'Enim facilisis gravida neque convallis',
      cost: new Prisma.Decimal(Math.random() * 100).toFixed(2),
      ownerId: 1,
      splitMethod: SplitMethod.Amount,
    },
  },
  {
    data: {
      title: 'Commodo viverra maecenas accumsan lacus',
      cost: new Prisma.Decimal(Math.random() * 100).toFixed(2),
      ownerId: 2,
      splitMethod: SplitMethod.Amount,
    },
  },
  {
    data: {
      title: 'Egestas dui id ornare arcu',
      cost: new Prisma.Decimal(Math.random() * 100).toFixed(2),
      ownerId: 3,
      splitMethod: SplitMethod.Amount,
    },
  },
  {
    data: {
      title: 'Eu consequat ac felis donec',
      cost: new Prisma.Decimal(Math.random() * 100).toFixed(2),
      ownerId: 4,
      splitMethod: SplitMethod.Amount,
    },
  },
]
