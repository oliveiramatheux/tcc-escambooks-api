import { Request, Response, NextFunction } from 'express'
import { ResponseError } from '../utils/errors'

const asyncHandlerError = (error: ResponseError, _request: Request, response: Response, next: NextFunction) => {
  if (error.status && error.message) {
    return response.status(error.status).send(`Error: ${error.message}`)
  }
  response.status(500).send('Error: unknown server error')
  next()
}

export { asyncHandlerError }
