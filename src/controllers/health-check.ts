import { Request, Response } from 'express'

const check = (_request: Request, response: Response) => {
  response.status(200).send('Server is ok')
}

export { check }
