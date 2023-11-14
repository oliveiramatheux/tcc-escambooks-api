import { Request, Response } from 'express'
import {
  getUser,
  getAllUsersService,
  createUser,
  deleteUser,
  updateUser,
  getUsersByNameService
} from '../services'
import asyncHandler from 'express-async-handler'

const getUserByIdController = asyncHandler(
  async (request: Request, response: Response) => {
    const { id } = request.params
    const user = await getUser(id)
    response.status(200).send(user)
  }
)

const getAllUsersController = asyncHandler(
  async (_request: Request, response: Response) => {
    const users = await getAllUsersService()
    response.status(200).send(users)
  }
)

const createUserController = asyncHandler(
  async (request: Request, response: Response) => {
    const {
      name,
      email,
      password,
      birthDate,
      imageUrl,
      imageName,
      phone,
      address
    } = request.body
    const newUser = await createUser({
      name,
      email,
      password,
      birthDate,
      imageUrl,
      imageName,
      phone,
      address
    })
    response.status(201).send(newUser)
  }
)

const deleteUserByIdController = asyncHandler(
  async (request: Request, response: Response) => {
    const { id } = request.params
    const user = await deleteUser(id)
    response.status(200).send(user)
  }
)

const updateUserByIdController = asyncHandler(
  async (request: Request, response: Response) => {
    const { id } = request.params
    const { name, email, birthDate, imageUrl, imageName, phone, address } =
      request.body
    const newUser = await updateUser(id, {
      name,
      email,
      birthDate,
      phone,
      address,
      imageUrl,
      imageName
    })
    response.status(200).send(newUser)
  }
)

const getUsersByNameController = asyncHandler(
  async (request: Request, response: Response) => {
    const { name } = request.params
    const users = await getUsersByNameService(name)
    response.status(200).send(users)
  }
)

export {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  deleteUserByIdController,
  updateUserByIdController,
  getUsersByNameController
}
