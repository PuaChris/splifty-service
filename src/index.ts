import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import expenseRoutes from '@routes/expense-routes'
import { prisma } from 'prisma'

dotenv.config()

async function main() {
  console.log('Starting database...')

  const app: Express = express()
  const port = process.env.PORT || 8080

  // Express middleware
  app.use(express.json()) // parses incoming JSON from request bodies
  app.use(express.urlencoded()) // parses urlencoded bodies
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Access-Control-Allow-Headers',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
      ],
      maxAge: 600,
    })
  )

  app.use('/v1/expenses', expenseRoutes)

  app.get('/', () => {})

  // Catch unregistered routes
  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` })
  })

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
