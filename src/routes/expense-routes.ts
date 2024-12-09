import { Prisma } from '@prisma/client'
import express, { Request, Response, Router } from 'express'
import { EXPENSE_SELECT } from 'lib/constants/expense-select'
import { ExpenseBody } from 'lib/types/expense-types'
import { PartyBody } from 'lib/types/party-types'
import { getExpenseArgs } from 'lib/utils/expense-utils'
import { prisma } from 'prisma'

const routes: Router = express()

routes.get('/', async (req: Request, res: Response) => {
  try {
    console.log('Fetching expenses...')
    const expenses = await prisma.expense.findMany({
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

    res.send({ data })
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

      res.send({ data })
    } else {
      res.sendStatus(404)
    }
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
