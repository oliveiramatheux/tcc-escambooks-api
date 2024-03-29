import { Request, Response } from 'express'
import {
  getLikeByIdService,
  createLikeService,
  deleteLikeService,
  updateLikeByIdService,
  getLikesByBookUserIdService,
  getLikesByUserLikedIdService,
  deleteLikesByBookIdService
} from '../services'
import asyncHandler from 'express-async-handler'

const getLikeByIdController = asyncHandler(async (request: Request, response: Response) => {
  const { id } = request.params
  const like = await getLikeByIdService(id)
  response.status(200).send(like)
})

const createLikeController = asyncHandler(async (request: Request, response: Response) => {
  const { userId } = request.headers
  const {
    bookId,
    bookTitle,
    bookUserId,
    userLikedId,
    userLikedName,
    isVisualized
  } = request.body
  const like = await createLikeService({
    bookId,
    bookTitle,
    bookUserId,
    userLikedId,
    userLikedName,
    isVisualized
  }, String(userId))
  response.status(201).send(like)
})

const deleteLikeController = asyncHandler(async (request: Request, response: Response) => {
  const { id } = request.params
  const { userId } = request.headers
  const like = await deleteLikeService(id, String(userId))
  response.status(200).send(like)
})

const deleteLikesByBookIdController = asyncHandler(async (request: Request, response: Response) => {
  const { bookId } = request.params
  const like = await deleteLikesByBookIdService(bookId)
  response.status(200).send(like)
})

const updateLikeByIdController = asyncHandler(async (request: Request, response: Response) => {
  const { id } = request.params
  const {
    bookId,
    bookTitle,
    bookUserId,
    userLikedId,
    userLikedName,
    isVisualized
  } = request.body
  const like = await updateLikeByIdService(id, {
    bookId,
    bookTitle,
    bookUserId,
    userLikedId,
    userLikedName,
    isVisualized
  })
  response.status(200).send(like)
})

const getLikesByBookUserIdController = asyncHandler(async (request: Request, response: Response) => {
  const { bookUserId } = request.params
  const likes = await getLikesByBookUserIdService(bookUserId)
  response.status(200).send(likes)
})

const getLikesByUserLikedIdController = asyncHandler(async (request: Request, response: Response) => {
  const { userLikedId } = request.params
  const likes = await getLikesByUserLikedIdService(userLikedId)
  response.status(200).send(likes)
})

export { getLikeByIdController, createLikeController, deleteLikeController, updateLikeByIdController, getLikesByBookUserIdController, getLikesByUserLikedIdController, deleteLikesByBookIdController }
