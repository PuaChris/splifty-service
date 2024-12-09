import { Expense } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { ExpenseBody } from 'lib/types/expense-types'

export function getExpenseArgs(expense: ExpenseBody) {
  const expenseArgs: Expense = {
    id: expense.id,
    title: expense.title,
    date: expense.date,
    cost: new Decimal(expense.cost),
    type: expense.title,
    status: expense.status,
    splitMethod: expense.splitMethod,
    ownerId: expense.owner.id,
  }

  return expenseArgs
}
