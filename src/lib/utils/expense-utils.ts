import { Expense, Party } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { ExpenseBody } from 'lib/types/expense-types'

export function getExpenseArgs(expense: ExpenseBody) {
  const { title, date, cost, status, splitMethod, owner, parties } = expense

  const expenseArgs: Expense = {
    id: expense.id,
    title,
    date,
    cost: new Decimal(cost),
    type: expense.title,
    status,
    splitMethod,
    ownerId: owner.id,
  }

  const partyArgs: Party[] = parties.map((party) => {
    const { percent, amountOwed, settled, user } = party

    return {
      id: party.id,
      percent: new Decimal(percent),
      amountOwed: new Decimal(amountOwed),
      settled,
      userId: user.id,
      expenseId: expense.id,
    }
  })

  return { expenseArgs, partyArgs }
}
