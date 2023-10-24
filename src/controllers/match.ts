import { Request, Response } from 'express'
import { getMatchesByUserIdService, updateMatchByIdService } from '../services'
import asyncHandler from 'express-async-handler'

export const getMatchesByUserIdController = asyncHandler(async (request: Request, response: Response) => {
  const { userId } = request.headers
  const matches = await getMatchesByUserIdService(String(userId))
  response.status(200).send(matches)
})

export const updateMatchByIdController = asyncHandler(async (request: Request, response: Response) => {
  const { userId } = request.headers
  const { id } = request.params
  const {
    books,
    users,
    likes,
    usersConfirmed
  } = request.body
  const match = await updateMatchByIdService(id, {
    books,
    users,
    likes,
    usersConfirmed
  }, String(userId))
  response.status(200).send(match)
})
