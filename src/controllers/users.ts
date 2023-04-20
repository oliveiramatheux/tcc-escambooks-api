import { Request, Response } from 'express'
import { getUser, createUser, deleteUser, updateUser } from '../services'
import asyncHandler from 'express-async-handler'

const getUserByIdController = asyncHandler(async (request: Request, response: Response) => {
  const { id } = request.params
  const user = await getUser(id)
  response.status(200).send(user)
})

const createUserController = asyncHandler(async (request: Request, response: Response) => {
  const { name, email, password, age } = request.body
  const newUser = await createUser({ name, email, password, age })
  response.status(201).send(newUser)
})

const deleteUserByIdController = asyncHandler(async (request: Request, response: Response) => {
  const { id } = request.params
  const user = await deleteUser(id)
  response.status(200).send(user)
})

const updateUserByIdController = asyncHandler(async (request: Request, response: Response) => {
  const { id } = request.params
  const { name, email, age } = request.body
  const newUser = await updateUser(id, { name, email, age })
  response.status(200).send(newUser)
})

export { getUserByIdController, createUserController, deleteUserByIdController, updateUserByIdController }
