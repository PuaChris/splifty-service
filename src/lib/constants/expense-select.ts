export const EXPENSE_SELECT = {
  id: true,
  title: true,
  date: true,
  cost: true,
  type: true,
  status: true,
  splitMethod: true,

  owner: {
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  },
  parties: {
    select: {
      id: true,
      percent: true,
      amountOwed: true,
      settled: true,

      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  },
}
