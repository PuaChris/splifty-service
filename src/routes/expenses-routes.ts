import { Prisma } from '@prisma/client'
import express, { Request, Response, Router } from 'express'
import { ExpenseBody } from 'lib/types/expenses-types'
import { getExpenseArgs } from 'lib/utils/expenses-utils'
import { prisma } from 'prisma'

const routes: Router = express()
const expenseSelect: Prisma.ExpenseSelect = {
  id: true,
  title: true,
  date: true,
  cost: true,
  type: true,
  status: true,
  splitMethod: true,

  owner: true,
  parties: {
    select: {
      id: true,
      user: true,
      percent: true,
      amountOwed: true,
      settled: true,
    },
  },
}

routes.get('/', async (req: Request, res: Response) => {
  try {
    console.log('Fetching expenses...')
    const expenses = await prisma.expense.findMany({
      select: expenseSelect,
    })

    console.log('Successfully fetched expenses.')

    res.send({ data: expenses })
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

routes.get('/:expenseId', async (req: Request, res: Response) => {
  const { expenseId } = req.params
  try {
    console.log('Fetching expense...')

    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
      select: expenseSelect,
    })
    console.log('Successfully fetched expense.')

    res.send({ data: expense })
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

routes.put('/:expenseId', async (req: Request, res: Response) => {
  const { expenseId } = req.params
  const expenseBody: ExpenseBody = req.body
  const args = getExpenseArgs(expenseBody)
  try {
    console.log('Updating expense...')
    const expenseUpdateArgs: Prisma.ExpenseUpdateArgs = {
      where: {
        id: expenseId,
      },
      data: args,
    }

    await prisma.expense.update(expenseUpdateArgs)

    console.log('Successfully updated expense.')
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

routes.post('/', async (req: Request, res: Response) => {
  const expenseBody: ExpenseBody = req.body
  const args = getExpenseArgs(expenseBody)

  try {
    console.log('Creating expense...')

    const expenseCreateArgs: Prisma.ExpenseCreateArgs = {
      data: args,
    }

    await prisma.expense.create(expenseCreateArgs)
    console.log('Successfully created expense.')

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

routes.delete('/:expenseId', async (req: Request, res: Response) => {
  const { expenseId } = req.params

  try {
    console.log('Deleting expense...')

    await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    })

    console.log('Successfully deleted expense.')

    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

export default routes
