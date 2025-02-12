import { Prisma } from '@prisma/client'
import { EXPENSE_SELECT } from 'lib/constants/expense-select'
import { ExpenseBody } from 'lib/types/expense-types'
import { PartyBody } from 'lib/types/party-types'
import { getExpenseArgs } from 'lib/utils/expense-utils'
import { prisma } from 'prisma'

interface ExpenseController {
  fetchMany: () => Promise<ExpenseBody[]>
  fetchOne: (id: string) => Promise<ExpenseBody | null>
  createOne: (expense: ExpenseBody) => Promise<void>
  updateOne: (id: string, expense: ExpenseBody) => Promise<number>
  deleteOne: (id: string) => Promise<void>
}

export const expenseController: ExpenseController = {
  fetchMany,
  fetchOne,
  createOne,
  updateOne,
  deleteOne,
}

async function fetchMany(): Promise<ExpenseBody[]> {
  console.log('Fetching expenses...')
  const expenses = await prisma.expense.findMany({
    orderBy: [{ date: 'desc' }],
    select: EXPENSE_SELECT,
  })

  const data: ExpenseBody[] = expenses.map((exp) => {
    const parties: PartyBody[] = exp.parties.map((party) => {
      return {
        ...party,
        percent: party.percent.toNumber(),
        amountOwed: party.amountOwed.toNumber(),
      }
    })

    return {
      ...exp,
      cost: exp.cost.toNumber(),
      parties,
    }
  })

  console.log('Successfully fetched expenses.')
  return data
}

async function fetchOne(id: string): Promise<ExpenseBody | null> {
  console.log('Fetching expense...')

  const expense = await prisma.expense.findUnique({
    where: {
      id,
    },
    select: EXPENSE_SELECT,
  })

  if (expense) {
    const parties: PartyBody[] = expense.parties.map((party) => {
      return {
        ...party,
        percent: party.percent.toNumber(),
        amountOwed: party.amountOwed.toNumber(),
      }
    })

    const data: ExpenseBody = {
      ...expense,
      cost: expense.cost.toNumber(),
      parties,
    }

    console.log('Successfully fetched expense.')

    return data
  }

  return null
}

async function createOne(expense: ExpenseBody) {
  console.log('Creating expense...')

  const { expenseArgs } = getExpenseArgs(expense)
  const expenseCreateArgs: Prisma.ExpenseCreateArgs = {
    data: expenseArgs,
  }
  await prisma.expense.create(expenseCreateArgs)

  console.log('Successfully created expense.')
}

async function updateOne(id: string, expense: ExpenseBody) {
  console.log('Updating expense...')
  try {
    const { expenseArgs, partyArgs } = getExpenseArgs(expense)
    const expenseUpdateArgs: Prisma.ExpenseUpdateArgs = {
      where: {
        id,
      },
      data: expenseArgs,
    }

    await prisma.$transaction(async (tx) => {
      await tx.expense.update(expenseUpdateArgs)

      for (const party of partyArgs) {
        const partyUpdateArgs: Prisma.PartyUpdateArgs = {
          where: {
            id: party.id,
          },
          data: party,
        }

        await tx.party.update(partyUpdateArgs)
      }
    })

    console.log('Successfully updated expense.')
    return 200
  } catch (err) {
    console.error(err)
    return 500
  }
}

async function deleteOne(id: string) {
  console.log('Deleting expense...')

  await prisma.expense.delete({
    where: {
      id,
    },
  })

  console.log('Successfully deleted expense.')
}
