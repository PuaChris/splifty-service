import express, { Request, Response, Router } from 'express'
import { expenseController } from 'lib/database/expense-db'
import { ExpenseBody } from 'lib/types/expense-types'

const routes: Router = express()

routes.get('/', async (req: Request, res: Response) => {
  try {
    const data = await expenseController.fetchMany()

    res.send({ data })
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

routes.get('/:expenseId', async (req: Request, res: Response) => {
  const { expenseId } = req.params
  try {
    const data = await expenseController.fetchOne(expenseId)
    if (data) {
      res.send({ data })
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

routes.post('/', async (req: Request, res: Response) => {
  const expenseBody: ExpenseBody = req.body

  try {
    await expenseController.createOne(expenseBody)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

routes.put('/:expenseId', async (req: Request, res: Response) => {
  const { expenseId } = req.params
  const expenseBody: ExpenseBody = req.body

  try {
    await expenseController.updateOne(expenseId, expenseBody)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

routes.delete('/:expenseId', async (req: Request, res: Response) => {
  const { expenseId } = req.params

  try {
    await expenseController.deleteOne(expenseId)
    res.sendStatus(200)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

export default routes
