import express, { Request, Response, Router } from 'express'
import { prisma } from 'prisma'

const routes: Router = express()

routes.get('/', async (req: Request, res: Response) => {

  const expenses = await prisma.expense.findMany({
    select: {
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
          settled: true
        }
      }
    }
  })

  console.log(expenses)

  res.send({data: expenses})
})

routes.get('/:expenseId', async (req: Request, res: Response) => {

  const {expenseId} = req.params

  const expense = await prisma.expense.findUnique({
    where: {
      id: expenseId
    },
    select: {
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
          settled: true
        }
      }
    }
  })

  console.log(expense)

  res.send({data: expense})
})

export default routes