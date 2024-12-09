import express, { Request, Response, Router } from 'express'

const routes: Router = express.Router()

routes.get('/', (req: Request, res: Response) => {
  console.log(req, res)
})

export default routes
